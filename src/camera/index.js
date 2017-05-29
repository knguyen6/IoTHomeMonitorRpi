'use strict';

const RaspiCam = require('raspicam');

const Handlers = require('./handlers');
const Utils = require('./utils');

const video = new RaspiCam({
  mode: 'video',
  output: Utils.fileOutput('intruder.mp4'),
  timeout: 300000,
  verbose: true
});

const photo = new RaspiCam({
	mode: 'photo',
	output: Utils.fileOutput('intruder.png'),
	verbose: true
});

video.on('started', Handlers.onStart);
video.on('stop', Handlers.onStop);
video.on('read', Handlers.onRead);

photo.on('started', Handlers.onStart);
photo.on('stop', Handlers.onStop);
photo.on('read', Handlers.onRead);

module.exports = {
	video: video,
	photo: photo
};