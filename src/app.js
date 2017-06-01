const Aws   = require('aws-sdk');
const IoT   = require('aws-iot-device-sdk');
const gpio  = require('onoff').Gpio;
const io    = require('socket.io-client');

/* Hardware module dependencies */
const magnetic      = require('./magnetic');
const temperature   = require('./temperature');
const rPiController = require('./controller');

const Utils  = require('./utils');
const Socket = io(Utils.socketServerUrl, { reconnection: true });

/* Instantiate device and pin settings */
const Device = IoT.device(require('./credentials'));
const pins = require('./pins'); // ex) PINS.motion['gpio']

Device.on('connect', (err, data) => {
  if (err) throw err;
  console.log('iot-home-monitor successfully connected to AWS IoT Device Gateway');
  
  /********************Application logic********************/
	//magnetic.magneticSensorCollector(pins['magnetic'].gpio, rPiController.onMagneticDoorOpen(Device) );

	let pirSensor = new gpio(pins.motion['gpio'], 'in', 'both');
	pirSensor.watch(rPiController.onPirMotionSensorDetect(Device));

	//FIXME: just to test motion & buzzer, clean this up after finally sync up code.
	// mostly will use onPirMotionSensorDetect, already placed buzzer code in it.
    	//pirSensor.watch(rPiController.onDetectMotion)

});

Socket.on('connect', () => {
  console.log('Raspberry PI successfully connected to Socket server. Ready to start streaming...');
  Socket.on('iot-home-intruder-start-stream', rPiController.onStreamInvocation(Socket));
});