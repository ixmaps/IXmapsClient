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

module.exports = function(options, send, donecb) {
  var timeout, aborted = false, platformProcessor = {
      data: function(output) {
        send('output', output, {dest: options.dest, dest_ip: options.dest_ip});
      },
      end: function(output, params, aborted) {
        if (!output) {
          throw "no output";
        }
        send('end', output, {dest: options.dest, dest_ip: options.dest_ip});
        if (!params) {
          throw "huh";
        }
        donecb(aborted ? {aborted: true} : null, { client: 'platform', protocol: 'icmp', tr_data: output, tr_invocation: params.join(' ') });
      },
      error: function(err) {
        send('error', err, {dest: options.dest, dest_ip: options.dest_ip});
        donecb(err);
      }
    }, p = platforms[platform];
  if (!p) {
    throw 'missing platform ' + platform;
  }

  var buf = '', params = (options.platform_protocol !== 'Default' ? [p.protocol, options.platform_protocol] : []).concat([p.noresolve, p.queries, options.queries, p.maxhops, options.maxhops, options.dest_ip]),
    spawned = child.spawn(p.command, params);

  console.log(p.command + ' ' + params.join(' '));
  if (options.platform_limit_ms > 0) {
    timeout = setTimeout(function() {
      aborted = true;
      // this triggers end
      spawned.kill('SIGHUP');
    }, options.platform_limit_ms);
  }
  spawned.stdout.on('data', function(data) {
    buf += data.toString();
    console.log('DATA' + buf);
    platformProcessor.data(buf);
  }).on('end', function() {
    clearTimeout(timeout);
    console.log('END' + buf);
    params.unshift(p.command);
    platformProcessor.end(buf, params, aborted);
  }).on('error', function(err) {
    console.log('ERROR' + buf);
    if (timeout) clearTimeout(timeout);
    platformProcessor.error(err);
  });
};
