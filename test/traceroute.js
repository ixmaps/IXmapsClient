// # Mocha tests for parsing *Nix (Linux, BSD, MacOS)
// examples from http://www.exit109.com/~jeremy/news/providers/traceroute.html#reading

/* jslint node: true */
/* global describe, it */

'use strict';

var expect = require('expect.js'), net = require('net'), _ = require('lodash');

var parser = require('../lib/parseNix');

var NAT = '192.168.0.1';

describe('parseNix', function () {

  describe('parse()', function () {
    it('should parse a route', function () {
      var buffer = [
      // will be ignored
        'traceroute to 10.5.128.98, 30 hops max, 60 byte packets',
      // four RTTs with the same IP
        ' 1 192.168.0.1 0.994 ms 0.444 ms 0.449 ms 0.426 ms',
      // failed attempt, will be discarded
        ' 2 * * * *',
      // last attempt failed, will be -1
        ' 3 10.6.0.157 40.233 ms 106.772 ms 62.710 ms *',
      // error, will return three RTTs
        ' 4 208.225.64.50  35.931 ms !H *  39.970 ms !H',
      // router address change, one RTT per two IPs
        ' 5 206.80.192.221 127.569 ms 216.161.182.121  185.214 ms *'
        ].join('\n');
      var res = parser.parse(buffer, 4);

      expect(res.length).to.be(5);

      describe('validate addresses', function () {
        it('should be a NAT address', function () {
          expect(res[0].every(function(s) {
            return s.ip === NAT;
          })).to.be(true);
        });
      });
      describe('validate hops', function () {
        it('should have four results for regular hops', function () {
          expect(_.first(res, 3).every(function(h) {
            return h.length === 4;
          })).to.be(true);
        });

        it('should have an IP address for each hop', function () {
          expect(res.every(function(h) {
            return h.every(function(s) {
              return net.isIP(s.ip);
            });
          })).to.be(true);
        });

        it('should have timeouts for the second hop', function () {
          expect(res[1].every(function(s) {
            return s.rtt === -1 && s.ip === NAT;
          })).to.be(true);
        });

      });
      describe('handle error conditions', function() {
        // missing values will be padded with -1
        it('should ignore error conditions', function() {
          expect(res[3].length).to.be(3);
        });
      });

      describe('handle router change', function() {
        it('should switch to the new address', function() {
          expect(res[4].length).to.be(3);
          expect(res[4][0].ip).to.be('206.80.192.221');
          expect(res[4][1].ip).to.be('216.161.182.121');
        });
      });
    });
  });

  describe('parseHop()', function () {
  });

});
