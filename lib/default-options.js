/* jslint node: true */
'use strict';

var _ = require('lodash');

module.exports = function() {
  return _.clone({
    submitter: '',
    postal_code: '',
    dest: '',
    trset: '',
    queries: 4,
    timeout: 750,
    maxhops: 24,
    raw_protocol: 'ICMP',
    max_sequential_errors: 3,
    include_platform_traceroute: false,
    platform_protocol: 'Default',
    platform_limit_ms: 60000
  });
};
