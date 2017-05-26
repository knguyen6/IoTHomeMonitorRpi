'use strict';

const RaspiCam = require('raspicam');

const Handlers = require('./handlers');
const Utils = require('./utils');

const video = new RaspiCam({
  mode: 'video',
  output: Utils.fileOutput('intruder.mp4'),
  timeout: 300000
});

const photo = new RaspiCam({
	mode: 'photo',
	output: Utils.fileOutput('intruder.png')
});

video.on('started', Handlers.onStart);
video.on('stop', Handlers.onStop);

module.exports = {
	video: video,
	photo: photo
};