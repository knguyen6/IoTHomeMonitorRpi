const gpio = require('rpi-gpio');

exports.readInput = function(pin) {
  return function() {
    gpio.read(pin, function(err, value) {
      if (err)
        console.log('Error reading sensor: ', err);
      else 
	translate(value);

    });
  };
};


function translate(value){
    if (value) console.log('Door Open, sensor value = ', value);
    else console.log('Door Close, sensor value = ', value);

}
