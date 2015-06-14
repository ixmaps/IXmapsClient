/* jslint node: true */

"use strict";

var child = require('child_process'), _ = require('lodash');

var platform = require('os').platform(), unixy = {
  protocols : ['icmp','udp', 'tcp'],
  defaultProtocol: 'icmp',
  command: 'traceroute',
  noresolve: '-n',
  queries: '-q',
  protocol: '-P',
  maxhops: '-m',
}, platforms = {
  linux: _.assign({}, unixy, {defaultProtocol: 'default'}),
  freebsd: _.assign({}, unixy, {defaultProtocol: 'default'}),
  sunos: _.assign({}, unixy, {defaultProtocol: 'default'}),
  darwin: _.assign({}, unixy, {defaultProtocol: 'default'}),
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
  var timeout, platformProcessor = {
      data: function(output) {
        send('output', output);
      },
      end: function(output, params) {
        if (!output) {
          throw "no output";
        }
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

  var buf = '', params = (options.platform_protocol !== 'Default' ? [p.protocol, options.platform_protocol] : []).concat([p.noresolve, p.queries, options.queries, p.maxhops, options.maxhops, options.dest_ip]),
    spawned = child.spawn(p.command, params);

  console.log(p.command + ' ' + params.join(' '));
  if (options.limit_time) {
    timeout = setTimeout(function() {
      spawned.kill('SIGHUP');
    }, options.limit_time);
  }
  spawned.stdout.on('data', function(data) {
    buf += data.toString();
    console.log('bDATA' + buf);
    platformProcessor.data(buf);
  }).on('end', function() {
    clearTimeout(timeout);
    params.unshift(p.command);
    console.log('DATA' + buf);
    platformProcessor.end(buf, params);
  }).on('error', function(err) {
    clearTimeout(timeout);
    platformProcessor.error(err);
  });
};
