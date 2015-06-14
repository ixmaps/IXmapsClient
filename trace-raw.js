/* jslint node: true, esnext: true */

"use strict";

var dns = require('dns'), net = require('net'), _ = require('lodash');
var processor = require('./lib/processor.js');

var options = {
  client: 'ixnode cli',
  include_platform_traceroute: false,
  queries: 4,
  timeout: 1000,
  submitter: 'trace-raw',
  postal_code: 'm1m',
  maxhops: 30,
  dest: 'ixmaps.ca',
  nosubmit: false,
  raw_protocol: 'ICMP'
};

var p = process.argv.slice(2);

while (p.length) {
  let a = p.shift();
  if (a === '-p') {
    options.include_platform_traceroute = true;
  } else if (options[a.substr(1)] !== undefined && p.length) {
    options[a.substr(1)] = p.shift();
  } else {
    console.error.apply(null, ['usage:', process.argv[1], '-p (include platform trace)'].concat(Object.keys(options).map(function(k) { return '-' + k + ' value'; })));
    process.exit();
  }
}

processor.submitTraceOptions(options, function(type, message) {
  console.log(type, message);
});
