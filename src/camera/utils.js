'use strict';

const Path = require('path');

function fileOutput(output) {
  return `${Path.dirname(require.main.filename)}/media/${output}`;
}

module.exports = {
  fileOutput: fileOutput
};