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

const pins = require('./pins'); // ex) PINS.motion['gpio']

/* Application logic goes here and re-use separate modules */

// magnetic.magneticSensorCollector(PINS['motion'].gpio);

//read temp sensor on GPIO 17
// temperature.temperatureSensor();

let pirSensor = new gpio(pins.motion['gpio'], 'in', 'both');
pirSensor.watch((err, value) => {
	console.log('===========');
	console.log(`err ${err}`);
	console.log(`value ${value}`);
	console.log('===========');

	if (value) {
		let now = new Date();
		let timenow = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
		console.log(`movement detected - ${timenow}`);
		camera['photo'].start();

		// TODO asynchronously invoke aws and send photo

		// console.log('camera recording...');
		// camera['video'].start();
	}
});

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

/********************CAMERA TEST WITH S3********************************/
// camera['photo'].start();
// camera['photo'].on('read', (err, filename) => {
// 	let location = camera['photo'].get('output');
// 	camera['photo'].stop();

// 	fs.readFile(location, (err, fileData) => {
//   	if (err) throw err;

// 		S3.putObject({
// 			Bucket: 'tcss-573',
// 			Key: 'intruder.png',
// 			Body: fileData
// 		}, (err, s3Data) => {
// 			console.log(s3Data);
// 		});
// 	});
// });