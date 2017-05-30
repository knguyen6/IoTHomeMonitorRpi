'use strict';

const Aws = require('aws-sdk');
const S3 	= new Aws.S3();

function onDeviceConnected(err, data) {
	if (err) throw err;
	console.log('iot-home-monitor successfully connected to AWS IoT Device Gateway');
}

module.exports = {
	onDeviceConnected: onDeviceConnected
};