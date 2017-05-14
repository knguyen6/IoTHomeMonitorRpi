var gpio = require('rpi-gpio');
var pin = 23;

exports.magneticSensorCollector = function(pin) {

    gpio.setMode(gpio.MODE_BCM);
    setInterval(function(){ 
        gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH, readInput); 

    }, 1000);

}
 
function readInput() {
    gpio.read(pin, function(err, value) {
    if (err)
        console.log('Error reading sensor: ', err);
    else   
        console.log('The value is ' + value);
    });
}


