const AWS = require('aws-sdk');
const S3 = new AWS.S3();

// const camera = require('./camera');
// const magnetic = require('./magnetic');
// const buzzer = require('./buzzer');
// const motion = require('./motion');
// const temperature = require('./temperature');

// const pins = require('./pins'); // ex) PINS.motion['gpio']

/* Application logic goes here and re-use separate modules */

// magnetic.magneticSensorCollector(PINS['motion'].gpio);

//read temp sensor on GPIO 17
// temperature.temperatureSensor();

// let pirSensor = motion.init(pins.motion['gpio']);
// pirSensor.watch((err, value) => {
// 	if (value) {
// 		let timeNow = new Date().toLocaleString();
// 		console.log('movement detected - ${timeNow}');
// 		camera['photo'].start();

// 		// TODO asynchronously invoke aws and send photo

// 		console.log('camera recording...');
// 		camera['video'].start();
// 	}
// });

// camera['photo'].start();

console.log('sdfkushfdklsj');

S3.listBuckets((err, data) => {
	console.log(`err: ${err}`);
	console.log(`data: ${data}`);
});