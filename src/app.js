const Aws   = require('aws-sdk');
const IoT   = require('aws-iot-device-sdk');
const gpio  = require('onoff').Gpio;

/* Hardware module dependencies */
// const camera = require('./camera');
const magnetic = require('./magnetic');
const camera  = require('./camera');
const buzzer = require('./buzzer');
const temperature = require('./temperature');

/* Pin settings */
const pins = require('./pins'); // ex) PINS.motion['gpio']

/* Instantiate modules */
// const Device = IoT.device(require('./credentials'));

/********************AWS IoT Connection Test********************/
// Device.on('connect', rPiController['onDeviceConnected']);

/********************Application logic********************/
// magnetic.magneticSensorCollector(PINS['motion'].gpio);

// read temp sensor on GPIO 17
// temperature.temperatureSensor();

// let pirSensor = new gpio(pins.motion['gpio'], 'in', 'both');
// pirSensor.watch(rPiController['onCameraDetect']);

/********************Stream Camera********************/
// camera['stream'].start();