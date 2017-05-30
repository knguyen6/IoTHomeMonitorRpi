const gpio = require('rpi-gpio');

exports.readInput = function(pin, callback) {
  return function() {
    gpio.read(pin, function(err, value) {
      if (err){
        console.log('Error reading sensor: ', err);
	callback();
	}
      else {
	translate(value);
	callback(null, {'data':value});
	}//else
    });
  };
};


//value = false: door close
//value = true: door open
function translate(value){
    if (value) console.log('Door Open, sensor value = ', value);
    else console.log('Door Close, sensor value = ', value);

}
