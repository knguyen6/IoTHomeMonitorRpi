/* Native libraries */
const fs = require('fs');

/* AWS dependencies */
const Aws = require('aws-sdk');
const IoT = require('aws-iot-device-sdk');

/* Hardware module dependencies */
//const camera = require('./camera');
const magnetic = require('./magnetic');
//const buzzer = require('./buzzer');
const gpio = require('onoff').Gpio;
const temperature = require('./temperature');

/* Initialize function handlers */
const rPiController = require('./controller');

/* Pin settings */
const pins = require('./pins'); // ex) PINS.motion['gpio']

/* Instantiate modules */
//const DEVICE = IoT.device(require('./credentials'));
//const S3 = new Aws.S3();

/********************AWS IoT Connection Test********************/
//DEVICE.on('connect', rPiController['onDeviceConnected']);

/********************Application logic********************/

//Magnetic Door Sensor: 
 magnetic.magneticSensorCollector(pins.magnetic['gpio']);

// read temp sensor on GPIO 17
 temperature.temperatureSensor(pins.temperature['gpio'], pins.temperature['sensorType']);

//motion sensor:
let pirSensor = new gpio(pins.motion['gpio'], 'in', 'both');
pirSensor.watch(rPiController['detectMotion']);


//pirSensor.watch(rPiController['onCameraDetect']);
