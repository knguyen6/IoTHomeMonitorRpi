'use strict';

const fs = require('fs');
const Aws = require('aws-sdk');

const camera = require('./camera');
const S3 = new Aws.S3();

function onDeviceConnected(err, data) {
	if (err) {
		throw err;
	} else {
		console.log('iot-home-monitor successfully connected to AWS IoT Device Gateway');
	}
}

function onCameraDetect(err, value) {
	console.log('===========');
	console.log(`err ${err}`);
	console.log(`value ${value}`);
	console.log('===========');

	if (value) {
		let now = new Date();
		let timenow = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
		console.log(`movement detected - ${timenow}`);

		camera['photo'].start();
		camera['photo'].on('read', (err, filename) => {
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

module.exports = {
	onCameraDetect: onCameraDetect,
	onDeviceConnected: onDeviceConnected
};