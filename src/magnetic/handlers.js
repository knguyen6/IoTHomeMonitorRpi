const gpio = require('rpi-gpio');

exports.readInput = function(pin) {
  return function() {
    gpio.read(pin, function(err, value) {
      if (err)
        console.log('Error reading sensor: ', err);
      else
        console.log('The value is ' + value);
    });
  };
};