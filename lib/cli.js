/* jslint node: true, esnext: true */

"use strict";

var _ = require('lodash');

module.exports =  function(type) {
  var options = {
    client: 'IXmapsClient 1.1.1',
    queries: 4,
    submitter: 'trace-' + type,
    postal_code: 'm1m',
    maxhops: 30,
    dest: 'ixmaps.ca',
    platform_limit_ms: null,
    platform_protocol: 'Default',
  };

  if (type === 'raw') {
    _.assign(options, {
      nosubmit: false,
      include_platform_traceroute : false,
      raw_protocol: 'ICMP',
      timeout: 1000,
    trset: null
    });
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
