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

module.exports = function(options, send, finished) {
  var platformProcessor = {
      data: function(output) {
        send('output', output);
      },
      end: function(output, params) {
        send('end', output);
        if (!params) {
          throw 'huh';
        }
        finished(null, { client: 'platform', protocol: 'icmp', tr_data: output, tr_invocation: params.join(' ') });
      },
      error: function(err) {
        send('error', err);
        finished(err);
      }
    }, p = platforms[platform];
  if (!p) {
    throw 'missing platform ' + platform;
  }

  var buf = '', params = [p.noresolve, p.queries, options.queries, p.maxhops, options.maxhops, p.protocol, options.platform_protocol, options.dest_ip], spawned = child.spawn(p.command, params);
  spawned.stdout.on('data', function(data) {
    buf += data.toString();
    platformProcessor.data(buf);
  }).on('end', function() {
    params.unshift(p.command);
    platformProcessor.end(buf, params);
  }).on('error', function(err) {
    platformProcessor.error(err);
  });
};
