/* jslint node: true */

"use strict";

var dns = require('dns'), net = require('net'), _ = require('lodash');
var processor = require('./lib/processor.js');

GLOBAL.debug = true;
GLOBAL.sim = true;

var dest, dest_ip, options = {timeout: 1000, queries: 4, max_hops: 30};

dest = process.argv[2] || 'ixmaps.ca';

processor.runTrace(dest, options);
