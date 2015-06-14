/* jslint node: true, esnext: true */

"use strict";

var _ = require('lodash');

module.exports =  function(type) {
  var options = {
    client: 'ixnode cli',
    queries: 4,
    timeout: 1000,
    submitter: 'trace-' + type,
    postal_code: 'm1m',
    maxhops: 30,
    dest: 'ixmaps.ca',
    nosubmit: false,
    trset: null
  };

  if (type === 'raw') {
    _.assign(options, {include_platform_traceroute : false, raw_protocol: 'ICMP'});
  }

  var p = process.argv.slice(2);

  while (p.length) {
    let a = p.shift();
    if (type === 'raw' && a === '-p') {
      options.include_platform_traceroute = true;
    } else if (options[a.substr(1)] !== undefined && p.length) {
      options[a.substr(1)] = p.shift();
    } else {
      var usage = ['usage:', process.argv[1]];
      if (type === 'raw') {
        usage.push('[-p (include platform trace)]');
      }
      console.error.apply(null, usage.concat(Object.keys(options).map(function(k) { return '-' + k + ' value'; })));
      process.exit();
    }
  }
  return options;

};
