/* jslint node: true */

"use strict";

var _ = require('lodash');

var traceroute = require('./lib/platform-traceroute.js');

var options = require('./lib/cli.js')('platform');

options = _.assign(options, {dest_ip: options.dest});

traceroute(options, console.log, console.log);
