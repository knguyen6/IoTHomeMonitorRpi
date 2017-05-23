'use strict';

const RaspiCam = require('raspicam');

const Handlers = require('./handlers');
const Utils = require('./utils');

const camera = new RaspiCam({
  mode: 'video',
  output: Utils.fileOutput('intruder.mp4'),
  timeout: 300000
});

camera.on('started', Handlers.onStart);
camera.on('stop', Handlers.onStop);

module.exports = camera;