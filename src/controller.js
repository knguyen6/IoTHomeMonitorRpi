'use strict';

const Aws = require('aws-sdk');
const S3 	= new Aws.S3();

const buzzer = require('./buzzer');

buzzer.buzzerOff(); //always off

function onDeviceConnected(err, data) {
	if (err) throw err;

	console.log('iot-home-monitor successfully connected to AWS IoT Device Gateway');
}

function detectMotion(err, data){
	if (err) {
    console.log('Unable to collect data from motion sensor: ', err);
	} else {
   	if (data) {
			console.log('------- motion detected ------->', data);
	    buzzer.buzzerOn();
	    //TODO: right now, wait after 10s then turn off buzzer
	    //TODO: implement turning off by user
	    setTimeout(function(){ buzzer.buzzerOff(); }, 10000);
		}
	}
}

module.exports = {
	onDeviceConnected: onDeviceConnected,
	detectMotion: detectMotion
};