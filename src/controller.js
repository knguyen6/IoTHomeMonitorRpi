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

			Camera['s3Photo'].start();
			Camera['s3Photo'].on('read', (err, timestamp, fileName) => {
				Utils.ifErrThrow(err, 'Failed to take a photo snapshot!');

        if (fileName[fileName.length - 1] !== '~') {
          fs.readFile(`${Utils.photoLocation}/${fileName}`, (err, fileData) => {
           Utils.ifErrThrow(err, 'Failed to read file data for s3Photo!');
           let s3Options = {    
              Bucket: Utils.s3Bucket,
              Key: fileName,    
              Body: fileData    
            };

            S3.putObject(s3Options, (err, s3Data) => {
             Utils.ifErrThrow(err, 'Photo upload to S3 failed!');
             console.log(`Successfully uploaded photo to S3 ${s3Data.ETag}`);
            });
          });
        }
			});
		}
	}
}

module.exports = {
	onPirMotionSensorDetect: onPirMotionSensorDetect,
	detectMotion: detectMotion
};