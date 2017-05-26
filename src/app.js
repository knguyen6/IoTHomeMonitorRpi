const camera = require('./camera');
const magnetic = require('./magnetic');
const buzzer = require('./buzzer');
const motion = require('./motion');
const temperature = require('./temperature');

const pins = require('./pins'); // ex) PINS.motion['gpio']

/* Application logic goes here and re-use separate modules */

// magnetic.magneticSensorCollector(PINS['motion'].gpio);

//read temp sensor on GPIO 17
// temperature.temperatureSensor();

let pirSensor = motion.init(pins.motion['gpio']);
pirSensor.watch((err, value) => {
	if (value) {
		let timeNow = new Date().toLocaleString();
		console.log('movement detected - ${timeNow}');
		console.log('camera recording...');
		camera.start();
	}
});