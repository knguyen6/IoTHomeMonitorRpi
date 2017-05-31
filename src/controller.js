'use strict';

const Aws = require('aws-sdk');
const fs 	= require('fs');
const S3 	= new Aws.S3();

const buzzer = require('./buzzer');
const Utils	 = require('./utils');
const Camera = require('./camera');

buzzer.buzzerOff(); //always off

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

function onPirMotionSensorDetect(iotDeviceModule) {
	return function(err, value) {
		Utils.ifErrThrow(err, 'PIR motion sensor encountered error!');
		console.log('PIR motion sensor running...');

		if (value /*&& liveStreamIsOff*/) {
			console.log('PIR motion detected a movement');
			iotDeviceModule.publish(Utils.messageTopic, `Intruder detected. Live stream can be viewed here: ${Utils.liveStreamUrl}`);

			Camera['photo'].start();
			Camera['photo'].on('read', (err, timestamp) => {
				Utils.ifErrThrow(err, 'Failed to take a photo snapshot!');
				let location = Camera['photo'].get('output');   
        Camera['photo'].stop();

        fs.readFile(location, (err, fileData) => {
        	Utils.ifErrThrow(err, 'Failed to read file data for photo!');
        	let s3Options = {    
            Bucket: Utils.s3Bucket,
            Key: 'intruder.png',    
            Body: fileData    
          };

          S3.putObject(s3Options, (err, s3Data) => {
          	Utils.ifErrThrow(err, 'Photo upload to S3 failed!');
          	console.log(`Successfully uploaded photo to S3 ${s3Data.ETag}`);
          });
        });
			});
		}
	}
}

module.exports = {
	onPirMotionSensorDetect: onPirMotionSensorDetect,
	detectMotion: detectMotion
};