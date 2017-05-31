const Aws   = require('aws-sdk');
const IoT   = require('aws-iot-device-sdk');
const gpio  = require('onoff').Gpio;

/* Hardware module dependencies */
//const camera = require('./camera');
const magnetic = require('./magnetic');
//const buzzer = require('./buzzer');
const temperature = require('./temperature');

const rPiController = require('./controller');


/* Pin settings */
const pins = require('./pins'); // ex) PINS.motion['gpio']

/* Instantiate modules */
const Device = IoT.device(require('./credentialsKN'));

/********************AWS IoT Connection Test********************/
Device.on('connect', rPiController['onDeviceConnected']);

/********************Application logic********************/
magnetic.magneticSensorCollector(pins['motion'].gpio);

// read temp sensor on GPIO 17
// temperature.temperatureSensor(pins.temperature['gpio'], pins.temperature['sensorType']);

//motion sensor:
let pirSensor = new gpio(pins.motion['gpio'], 'in', 'both');
pirSensor.watch(rPiController['detectMotion']);


/********************Stream Camera********************/
// camera['stream'].start();
