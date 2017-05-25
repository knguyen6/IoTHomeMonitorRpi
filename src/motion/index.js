// =================================================================================
// Using rpi-gpio
// var gpio = require('rpi-gpio');

// function init(pin) {
// 	gpio.setMode(gpio.MODE_RPI);
// 	gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH);

// 	console.log('=========');
// 	console.log(gpio);
// 	console.log('=========');
// }

// // TODO extract this out into handlers.js
// function detect(action) {
// 	gpio.on('change', action);
// }

// module.exports = {
// 	init: init,
// 	detect: detect
// };


// =================================================================================
// Using Johnny five and raspi-io
// const Raspi = require('raspi-io');
// const Five = require('johnny-five');
// const Board = new Five.Board({
// 	io: new Raspi()
// });

// function init() {
// 	Board.on('ready', () => {
// 		console.log('board is ready');

// 		// Create a new `motion` hardware instance.
// 		let motion = new Five.Motion(4); //pin 7 (GPIO 4)

// 		motion.on('calibrated', () => {
// 			console.log('calibrated');
// 		});

// 		motion.on('motionstart', () => {
// 			console.log('motionstart');
// 		});

// 		motion.on('motionend', () => {
// 			console.log('motionend');
// 		});

// 	});
// }

// module.exports = {
// 	init: init
// };
// =================================================================================

const Gpio = require('onoff').Gpio;

function init(gpioPin) {
	return new Gpio(gpioPin, 'in', 'both');
}

module.exports = {
	init: init
}





