'use strict';

const Path = require('path');

const MESSAGE_TOPIC = 'iot-home-monitor';
const LIVE_STREAM_URL = 'http://ec2-52-34-34-51.us-west-2.compute.amazonaws.com:8081';
const S3_BUCKET = 'tcss-573';

function fileOutput(output) {
  return `${Path.dirname(require.main.filename)}/media/${output}`;
}

function ifErrThrow(err, message) {
  if (err) {
    console.log(message);
    throw err;
  }
}

module.exports = {
  messageTopic: MESSAGE_TOPIC,
  liveStreamUrl: LIVE_STREAM_URL,
  s3Bucket: S3_BUCKET,
  fileOutput: fileOutput,
  ifErrThrow: ifErrThrow
};