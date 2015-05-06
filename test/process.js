
/* jslint node: true */
/* global describe, it */

"use strict";

var expect = require('expect.js');

var process = require('../rt/lib/process.js');

var passHops = require('./passHops.json');

describe('raw-trace', function() {
  it('should process a route', function() {
    var processed = process.processPassHops(passHops);
    expect(processed.length).to.be(15);
    expect(processed.some(function(h) { return h.length !== 4; })).to.be(true);
  });
});
