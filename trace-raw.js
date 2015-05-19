/* jslint node: true, esnext: true */

"use strict";

var dns = require('dns'), net = require('net'), _ = require('lodash');
var processor = require('./lib/processor.js');

var options = {
  include_platform_traceroute: false,
  queries: 4,
  timeout: 1000,
  postal_code: "m1m",
  maxhops: 30
};

var p = process.argv.slice(2), dest = 'ixmaps.ca';

for (let i = 0; i < p.length; i++) {
  let a = p[i];
  if (a.indexOf('-') === 0) {
    if (a === '-p') {
      options.include_platform_traceroute = true;
    } else {
      console.error('usage:', process.argv[1], '[-p (include platform trace)]', 'dest');
      process.exit();
    }
  } else {
    dest = a;
  }
}

options.dest = dest;

console.log(options);

processor.doTrace(options, function(type, message) {
  console.log(type, message);
});
