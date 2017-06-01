const Aws   = require('aws-sdk');
const IoT   = require('aws-iot-device-sdk');
const gpio  = require('onoff').Gpio;

/* Hardware module dependencies */
const magnetic = require('./magnetic');
const temperature = require('./temperature');
const rPiController = require('./controller');




/* Instantiate device and pin settings */
const Device = IoT.device(require('./credentialsKN'));
const pins = require('./pins'); // ex) PINS.motion['gpio']

const MESSAGE_TOPIC = 'iot-home-monitor';
const LIVE_STREAM_URL = 'http://ec2-52-34-34-51.us-west-2.compute.amazonaws.com:8081';

Device.on('connect', (err, data) => {
  if (err) throw err;
  console.log('iot-home-monitor successfully connected to AWS IoT Device Gateway');

  /********************Application logic********************/
  // if (motionDetected) {
  //  Device.publish(MESSAGE_TOPIC, `Intruder detected. Live stream can be viewed here: ${LIVE_STREAM_URL}`);
  //}

	//magnetic:
	magnetic.magneticSensorCollector(pins.magnetic.gpio);


	//motion sensor:
	let pirSensor = new gpio(pins.motion['gpio'], 'in', 'both');
	pirSensor.watch(rPiController['detectMotion']);


/********************Stream Camera********************/
// camera['stream'].start();

// read temp sensor on GPIO 17
// temperature.temperatureSensor(pins.temperature['gpio'], pins.temperature['sensorType']);

// let pirSensor = new gpio(pins.motion['gpio'], 'in', 'both');
// pirSensor.watch(rPiController['onCameraDetect']);

  return console.log('attempted to publish');


});//from DEVICE
