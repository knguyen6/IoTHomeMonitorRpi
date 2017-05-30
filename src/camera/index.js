'use strict';

const RaspiCam 	= require('raspicam');
const io    		= require('socket.io-client');
const Spawn 		= require('child_process').spawn;
const fs 	  		= require('fs');

const Handlers 	= require('./handlers');
const Utils 		= require('./utils');

const video = new RaspiCam({
  mode: 'video',
  output: Utils.fileOutput('intruder.mp4'),
  timeout: 300000, // 5 minutes
  verbose: true
});

video.on('started', Handlers.onStart);
video.on('stop', Handlers.onStop);
video.on('read', Handlers.onRead);

const photo = new RaspiCam({
	mode: 'photo',
	output: Utils.fileOutput('image-stream.png'),
	width: 640,
	height: 480,
	timeout: 999999999,
	timelapse: 100,
	verbose: true
});

// TODO Change this URL to the EC2 server
const SOCKET_SERVER_URL 	= 'http://192.168.1.14:3000';
const MESSAGE_TOPIC 			= 'iot-home-intruder';

function startStream() {
	const Socket = io(SOCKET_SERVER_URL, { reconnection: true });
	Socket.on('connect', () => {
	  console.log('Raspberry PI successfully connected to Socket server. Ready to start streaming...');

	  photo.start();
	  photo.on('read', (err, timestamp) => {
	    if (err) throw err;

	    let imageLocation = photo.get('output');
	    console.log('=======> Photo taken');
	    console.log('=======> imageLocation:', imageLocation);
	    fs.readFile(imageLocation, (err, imageStream) => {
	      if (err) throw err;
	      console.log('=======> Successfully read image file, emitting stream...');
	      Socket.emit(MESSAGE_TOPIC, imageStream.toString('base64'));
	    });
	  });
	});
}

module.exports = {
	video: video,
	photo: photo,
	stream: {
		start: startStream
	}
};