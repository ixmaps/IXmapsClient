/* jslint node: true */

"use strict";

var child = require('child_process');

var platform = require('os').platform(), unixy = {
  protocols : ['icmp','udp', 'tcp'],
  command: 'traceroute',
  noresolve: '-n',
  queries: '-q',
  protocol: '-P',
  maxhops: '-m',
}, platforms = {
  linux: unixy,
  freebsd: unixy,
  sunos: unixy,
  darwin: unixy,
  win32: {
    protocols : ['icmp','udp', 'tcp'],
    command: 'tracert',
    noresolve: '-n',
    queries: '-q',
    protocol: '-P',
    maxhops: '-m',
  }
};

module.exports = function(options, caller) {
  var p = platforms[platform];
  if (!p) {
    throw 'missing platform ' + platform;
  }

  var buf = '', params = [p.noresolve, p.queries, options.queries, p.maxhops, options.maxhops, options.dest_ip], spawned = child.spawn(p.command, params);
  spawned.stdout.on('data', function(data) {
    buf += data.toString();
    caller.data(buf);
  }).on('end', function() {
    params.unshift(p.command);
    caller.end(buf, params);
  }).on('error', function(err) {
    caller.error(err);
  });
};
