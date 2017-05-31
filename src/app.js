const Aws   = require('aws-sdk');
const IoT   = require('aws-iot-device-sdk');
const gpio  = require('onoff').Gpio;

/* Hardware module dependencies */
const magnetic = require('./magnetic');
//const buzzer = require('./buzzer');
const temperature = require('./temperature');

/* Instantiate device and pin settings */
const Device = IoT.device(require('./credentials'));
const pins = require('./pins'); // ex) PINS.motion['gpio']
const rPiController = require('./controller');

Device.on('connect', (err, data) => {
  if (err) throw err;
  console.log('iot-home-monitor successfully connected to AWS IoT Device Gateway');

  /********************Application logic********************/

  // magnetic.magneticSensorCollector(PINS['motion'].gpio);

  // read temp sensor on GPIO 17
  // temperature.temperatureSensor(pins.temperature['gpio'], pins.temperature['sensorType']);

  let pirSensor = new gpio(pins.motion['gpio'], 'in', 'both');
  pirSensor.watch(rPiController.onPirMotionSensorDetect(Device));

});