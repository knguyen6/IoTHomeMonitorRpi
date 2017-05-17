'use strict';

exports.onStart = function(error, timestamp) {
  console.log(`camera recording [${timestamp}]`);
};

exports.onStop = function(timestamp) {
  console.log(`camera recording done [${timestamp}]`);
};