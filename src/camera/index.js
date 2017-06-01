'use strict';

const RaspiCam 	= require('raspicam');
const io    		= require('socket.io-client');
const Spawn 		= require('child_process').spawn;
const fs 	  		= require('fs');

const Handlers 	= require('./handlers');
const Utils 		= require('../utils');

const video = new RaspiCam({
  mode: 'video',
  output: Utils.fileOutput('intruder.mp4'),
  timeout: 300000, // 5 minutes
  verbose: true
});

video.on('started', Handlers.onStart);
video.on('stop', Handlers.onStop);
video.on('read', Handlers.onRead);

const liveStreamPhoto = new RaspiCam({
	mode: 'photo',
	output: Utils.fileOutput('image-stream.png'),
	width: 640,
	height: 480,
	timeout: 999999999,
	timelapse: 100,
	verbose: true
});

const s3Photo = new RaspiCam({
	mode: 'photo',
	output: Utils.fileOutput('intruder-detected%04d.png'),
	width: 640,
	height: 480,
	timeout: 10000, // 10s
	timelapse: 2000, // 2s
	verbose: true
});

function startStream() {
	const Socket = io(Utils.socketServerUrl, { reconnection: true });
	Socket.on('connect', () => {
	  console.log('Raspberry PI successfully connected to Socket server. Ready to start streaming...');

	  liveStreamPhoto.start();
	  liveStreamPhoto.on('read', (err, timestamp) => {
	    if (err) throw err;

	    let imageLocation = liveStreamPhoto.get('output');
	    console.log('=======> Photo taken');
	    console.log('=======> imageLocation:', imageLocation);
	    fs.readFile(imageLocation, (err, imageStream) => {
	      if (err) throw err;
	      console.log('=======> Successfully read image file, emitting stream...');
	      Socket.emit(Utils.messageTopic, imageStream.toString('base64'));
	    });
	  });
	});
}

module.exports = {
	video: video,
	liveStreamPhoto: liveStreamPhoto,
	s3Photo: s3Photo,
	stream: {
		start: startStream
	}
};