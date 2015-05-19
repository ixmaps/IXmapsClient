/* jslint node: true */

"use strict";

var traceroute = require('./lib/platform-traceroute.js');

var dest, dest_ip, options = {timeout: 1000, queries: 4, maxhops: 30, maxttl: 30};

options.dest_ip = process.argv[2] || '142.150.149.197';

traceroute(options, { data: console.log, end: console.log, error: console.error});
