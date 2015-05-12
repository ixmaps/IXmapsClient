/* jslint node: true */

"use strict";

var dns = require('dns'), net = require('net'), _ = require('lodash');
var rawTrace = require('./lib/process.js');

var sendTrace = require('./lib/sendTrace.js');
GLOBAL.debug = true;
GLOBAL.sim = true;

var dest, dest_ip, options = {timeout: 1000, queries: 4, maxTTL: 30};

dest = process.argv[2] || 'ixmaps.ca';
if (!net.isIP(dest)) {
  dns.resolve4(dest, function(err, addresses) {
    if (err) {
      rawTrace.finCB('cannot resolve host');
    } else {
      options = _.extend(options, { address: addresses[0]});
      rawTrace.doTrace(options);
    }
  });
} else {
  options = _.extend(options, {address: dest});
  rawTrace.doTrace(options, dest);
}
