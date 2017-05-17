'use strict';

const RaspiCam = require('raspicam');
const Path = require('path');

const Handlers = require('./handlers');

let FILE_OUTPUT = `${Path.dirname(require.main.filename)}/media/intruder.mp4`;

const camera = new RaspiCam({
  mode: 'video',
  output: FILE_OUTPUT,
  timeout: 5000
});

camera.on('started', Handlers.onStart);
camera.on('exited', Handlers.onStop);

module.exports = camera;