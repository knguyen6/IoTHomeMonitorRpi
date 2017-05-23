const gpio = require('rpi-gpio');
const handlers = require('./handlers');


exports.magneticSensorCollector = function(pin) {

  gpio.setMode(gpio.MODE_BCM);
  setInterval(function() {
    gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH, handlers.readInput(pin));
  }, 1000);

};
