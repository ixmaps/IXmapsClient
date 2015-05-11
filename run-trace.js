/* jslint node: true */

"use strict";

var dns = require('dns'), net = require('net');
var rawTrace = require('./lib/process.js');

var sendTrace = require('./lib/sendTrace.js');
GLOBAL.debug = true;
GLOBAL.sim = true;

var dest, dest_ip;

dest = process.argv[2] || 'ixmaps.ca';
if (!net.isIP(dest)) {
  dns.resolve4(dest, function(err, addresses) {
    if (err) {
      rawTrace.finCB('cannot resolve host');
    } else {
      rawTrace.doTrace(dest, addresses[0]);
    }
  });
} else {
  rawTrace.doTrace(dest, dest);
}
