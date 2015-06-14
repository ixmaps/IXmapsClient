/* jslint node: true, esnext: true */

"use strict";

var dns = require('dns'), net = require('net'), _ = require('lodash');
var processor = require('./lib/processor.js');

var options = require('./lib/cli.js')('raw');

processor.submitTraceOptions(options, function(type, message) {
  console.log(type, message);
});
