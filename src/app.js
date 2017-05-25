// const camera = require('./camera');
// const magnetic = require('./magnetic');
// const buzzer = require('./buzzer');
const motion = require('./motion');
// const temperature = require('./temperature');

/* Application logic goes here and re-use separate modules */

//read magnetic sensor on pin GPIO 23
// const MAGNETIC_PIN = 23;
// magnetic.magneticSensorCollector(MAGNETIC_PIN);

//camera.start();

//read temp sensor on GPIO 17
// temperature.temperatureSensor();

//Read motion sensor, after refactoring code in motion directory.
let GPIO_PIN = 17;
let sensor = motion.init(GPIO_PIN);
sensor.watch((err, value) => {
	console.log('=========');
	console.log(`err: ${err}`);
	console.log(`value: ${value}`);
	console.log('=========');
});