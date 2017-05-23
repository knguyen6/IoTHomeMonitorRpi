'use strict';

const Gpio = require('onoff').Gpio;

let sensor = new Gpio(4, 'in');

sensor.watch((err, value) => {
  console.log(`err: ${err}`);
  console.log(`value: ${value}`);
});