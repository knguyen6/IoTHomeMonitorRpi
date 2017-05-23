const camera = require('./camera');
const magnetic = require('./magnetic');
const buzzer = require('./buzzer');
const motion = require('./motion');

/* Application logic goes here and re-use separate modules */

//on pin 23
var magneticPin = 23;
magnetic.magneticSensorCollector(magneticPin);
//camera.start();
