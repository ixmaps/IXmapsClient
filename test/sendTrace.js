// # Mocha tests for tr submission

/* jslint node: true */
/* global describe, it */

'use strict';

var expect = require('expect.js'), net = require('net'), _ = require('lodash');

var parser = require('../lib/parseNix'), sender = require('../lib/sendTrace');
var localAddress = '189.136.107.40', finalAddress = '201.234.65.134';

describe('sendTrace', function () {
  describe('process', function() {
    var hops = parser.parse('traceroute with local address step\n 1  ' + localAddress + ' 0.379 ms  0.644 ms  0.744 ms  0.894 ms\n2  212.211.30.2  0.379 ms  0.644 ms  0.744 ms  0.894 ms \n');
    expect(hops.length).to.be(2);
    sender.removeLocal(hops);
    it('should remove the local address', function() {
      expect(hops.length).to.be(1);
      expect(hops[0].every(function(a) { return a.ip !== localAddress; })).to.be(true);
    });

    it('should remove failing steps', function() {
      var hops = parser.parse('traceroute with failed step\n 1  192.211.30.1  0.379 ms  0.644 ms  0.744 ms  0.894 ms\n2  * * * *\n');
      expect(hops.length).to.be(2);
      hops = sender.normalizedHopsForSubmission(hops);
      expect(hops.length).to.be(1);
    });

    it('should normalize attempt counts', function() {
      var hops = parser.parse('traceroute with missing attempts\n 1  192.211.30.1  0.379 ms  0.644 ms  0.744 ms  0.894 ms\n2  212.211.30.2  0.379 ms  0.644 ms  !H  0.894 ms \n');
      expect(hops.length).to.be(2);
      hops = sender.normalizedHopsForSubmission(hops);
      expect(hops.length).to.be(1);
      expect(hops[0].length).to.be(4);
    });

    it('should convert rtts to integers', function() {
      var hops = parser.parse('traceroute with rtts attempts\n 1  192.211.30.1  0.379 ms  0.644 ms  0.744 ms  0.894 ms\n2  212.211.30.2  0.379 ms  0.644 ms  !H  0.894 ms \n');
      expect(hops.length).to.be(2);
      hops = sender.normalizedHopsForSubmission(hops);
      expect(hops.length).to.be(1);
      expect(hops[0].every(function(h) {
        return h.rtt === Math.floor(h.rtt);
      })).to.be(true);
    });
  });

});
