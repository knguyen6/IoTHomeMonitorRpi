/* Native libraries */
const fs = require('fs');

/* AWS dependencies */
const Aws = require('aws-sdk');
const IoT = require('aws-iot-device-sdk');

/* Hardware module dependencies */
const camera = require('./camera');
const magnetic = require('./magnetic');
const buzzer = require('./buzzer');
const gpio = require('onoff').Gpio;
const temperature = require('./temperature');

/* Instantiate modules */
const DEVICE = IoT.device(require('./credentials'));
const S3 = new Aws.S3();

const HANDLERS = require('./handlers');
const pins = require('./pins'); // ex) PINS.motion['gpio']

/* Application logic goes here and re-use separate modules */

// magnetic.magneticSensorCollector(PINS['motion'].gpio);

//read temp sensor on GPIO 17
// temperature.temperatureSensor();

let pirSensor = new gpio(pins.motion['gpio'], 'in', 'both');
pirSensor.watch(HANDLERS['onCameraDetect']);

/********************AWS IoT Connection Test********************/
// DEVICE.on('connect', (err, data) => {
// 	console.log(`err ${err}`);
// 	console.log(`data ${data}`);
// 	if (err) {
// 		throw err;
// 	} else {
// 		console.log('connected');
// 	}
// });