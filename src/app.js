const camera = require('./camera');
const magnetic = require('./magnetic');
const buzzer = require('./buzzer');
const motion = require('./motion');
const temperature = require('./temperature');

const PINS = require('./pins');
// PINS['motion'].gpio
// PINS['motion'].pin


/* Application logic goes here and re-use separate modules */

//read magnetic sensor on pin GPIO 23
// magnetic.magneticSensorCollector(PINS['motion'].gpio);

//camera.start();

//read temp sensor on GPIO 17
// temperature.temperatureSensor();

//Read motion sensor, after refactoring code in motion directory.
// let sensor = motion.init(PINS['motion'].gpio);
// sensor.detect((err, value) => {
// 	console.log('=========');
// 	console.log(`err: ${err}`);
// 	console.log(`value: ${value}`);
// 	console.log('=========');
// });