const gpio = require('rpi-gpio');
const handlers = require('./handlers');
const pin = 23;

exports.magneticSensorCollector = function(pin) {

  gpio.setMode(gpio.MODE_BCM);
  setInterval(function() {
    gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH, handlers.readInput);

  }, 1000);

};