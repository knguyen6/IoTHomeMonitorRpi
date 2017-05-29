'use strict';

const fs = require('fs');
const Aws = require('aws-sdk');

const camera = require('./camera');
const buzzer = require('./buzzer');

const S3 = new Aws.S3();

buzzer.buzzerOff();//always off

function onDeviceConnected(err, data) {
	if (err) throw err;
	console.log('iot-home-monitor successfully connected to AWS IoT Device Gateway');
}

function onCameraDetect(err, value) {
	if (err) throw err;

	if (value) {
		let now = new Date();
		let timenow = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
		console.log(`movement detected - ${timenow}`);

		camera['photo'].start();
		camera['photo'].on('read', (err, timestamp) => {
			let location = camera['photo'].get('output');
			camera['photo'].stop();

			fs.readFile(location, (err, fileData) => {
		  	if (err) throw err;

				S3.putObject({
					Bucket: 'tcss-573',
					Key: 'intruder.png',
					Body: fileData
				}, (err, s3Data) => {
					if (err) {
						console.log(`Upload to S3 failed: ${JSON.stringify(err)}`);
					}
					console.log(`Successfully uploaded photo to S3 ${s3Data.ETag}`);
				});
			});
		});

		// TODO start recording
		// console.log('camera recording...');
		// camera['video'].start();
	}
}

function detectMotion(err, data){
    if (err)
	console.log('Unable to collect data from motion sensor: ', err);
    else {
   	if (data){
    	    console.log('------- motion detected ------->', data);
	    buzzer.buzzerOn();
	    //TODO: right now, wait after 10s then turn off buzzer
	    //TODO: implement turning off by user
	    setTimeout(function(){ buzzer.buzzerOff(); }, 10000);
	}
	    
    }
}

module.exports = {
	onCameraDetect: onCameraDetect,
	onDeviceConnected: onDeviceConnected,
	detectMotion: detectMotion
};
