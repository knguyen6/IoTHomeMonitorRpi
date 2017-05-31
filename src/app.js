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

const MESSAGE_TOPIC = 'iot-home-monitor';
const LIVE_STREAM_URL = 'http://ec2-52-34-34-51.us-west-2.compute.amazonaws.com:8081';

Device.on('connect', (err, data) => {
  if (err) throw err;
  console.log('iot-home-monitor successfully connected to AWS IoT Device Gateway');

  /********************Application logic********************/

  // magnetic.magneticSensorCollector(PINS['motion'].gpio);

  // read temp sensor on GPIO 17
  // temperature.temperatureSensor(pins.temperature['gpio'], pins.temperature['sensorType']);

  let pirSensor = new gpio(pins.motion['gpio'], 'in', 'both');
  pirSensor.watch((err, value) => {
    if (err) {
      console.log('PIR motion sensor encountered error');
      throw err;
    }

    console.log('PIR motion sensor running...');
    if (value) {
      console.log('PIR motion detected a movement');
      Device.publish(MESSAGE_TOPIC, `Intruder detected. Live stream can be viewed here: ${LIVE_STREAM_URL}`);
    }
  });

  return console.log('attempted to publish');
});