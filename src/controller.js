'use strict';

const Aws = require('aws-sdk');
const fs 	= require('fs');
const S3 	= new Aws.S3();

const buzzer = require('./buzzer');
const Utils	 = require('./utils');
const Camera = require('./camera');
const magnetic = require('./magnetic');


buzzer.buzzerOff(); //always off

//flag to keep track if buzzer is on or off
var isBuzzerOn = false;


//watch for motion sensor, if detect movement, turn on buzzer for a bit
function onDetectMotion(err, data){
	if (err) {
    		console.log('onDetectMotion() error: ', err);
	} else {
   	if (data && !isBuzzerOn) {
	    console.log('------- motion detected ------->', data);
	    buzzer.buzzerOn();
	    setTimeout(function(){ buzzer.buzzerOff(); }, 10000);
		}
	}
}


//when the door open, turn on the buzzer if it's not already on. After door close
// keep buzzing for a while then turn off
function onMagneticDoorOpen(err, data) { 
    if (err) console.log('onMagneticDoorOpen() err: ', err);
    else {
	if (data.data && !isBuzzerOn ){
	    buzzer.buzzerOn();
	    isBuzzerOn = true;
	    console.log("========================= if ", data.data, isBuzzerOn);
	}
	else if (!data.data && isBuzzerOn ){
	    //buzzer.buzzerOff();
	    setTimeout(function(){ buzzer.buzzerOff(); }, 10000);
	    isBuzzerOn = false;
	    console.log("========================== else: ", data.data, isBuzzerOn);
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
	onDetectMotion: onDetectMotion,
	onMagneticDoorOpen: onMagneticDoorOpen
};
