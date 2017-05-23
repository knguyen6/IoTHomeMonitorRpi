var gpio = require('rpi-gpio');

//TODO: refactor this module, put code that collect data into handlers.js
var handlers = require('./handlers');

const MOTION_PIN = 12;


gpio.setMode(gpio.MODE_RPI)
gpio.setup(MOTION_PIN, gpio.DIR_IN, readInput)

function readInput() {
    console.log('===== start collecting data from PIR motion sensor =====');
   
    setInterval(function(){

        gpio.read(MOTION_PIN, function(error, value) {
	    if (error) console.log('Error getting data', error);
	    else 
                 if (value)
                       console.log('motion detected');
        })//gpio.read

    }, 500);        

}

