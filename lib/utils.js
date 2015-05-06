// # Utils

/* jslint node: true */

'use strict';
// encode an ip address and its round trip time in a regular way
exports.rtt = function(ip, time) {
  return { ip: ip, rtt: time};
};
