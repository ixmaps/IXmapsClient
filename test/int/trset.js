/* jslint node: true */

"use strict";

var test = require('tape');

var trset = require('../../lib/trset.js'), testset;

test('retrieve trsets', function(t) {
  trset.getTrsets(function(err, trsets) {
    t.equals(null, err, 'no error');
    t.equals(true, trsets.length > 0, 'retrieve trsets');
    t.equals(true, trsets.indexOf('testing') > 0, 'has testing trset');
    t.end();
    testset = trsets[0];
  });
});

test('retrieve testing trset', function(t) {
  trset.getTrset('testing', function(err, items) {
    t.equals(null, err, 'no error');
    t.equals(true, items.length > 0, 'retrieve trset');
    t.end();
  });
});

test('retrieve remote trset', function(t) {
  trset.getTrset(testset, function(err, items) {
    t.equals(null, err, 'no error');
    t.equals(true, items.length > 0, 'retrieve trset');
    t.end();
  });
});
