'use strict';

exports.onStart = function(error, timestamp) {
  console.log(`camera recording [${timestamp}]`);
};

exports.onStop = function() {
  console.log(`camera recording done`);
};

exports.onRead = function(err, timestamp) {
	let now = new Date(timestamp);

	console.log(`snapshot saved on ${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`);
};
