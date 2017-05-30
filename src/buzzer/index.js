/* require the buzzer module and handler */
const Handlers = require('./handlers');
var Gpio = require('onoff').Gpio;


/* initialize and configure buzzer module */
let buzzerModule = {
  makeSound: 'test'
};

/* register event handlers */

/* expose buzzer module */
//module.exports = buzzerModule;



const PIN = 5

var buzzer = new Gpio(PIN, 'out', 'rising');



//turn on:
function buzzerOn(){
        console.log("turning on buzzer");
        buzzer.writeSync(1);
}

//turn off:
function buzzerOff(){
        console.log("turning off buzzer ..");
        buzzer.writeSync(0);
}



exports.buzzerOn = buzzerOn;
exports.buzzerOff = buzzerOff;

