/* jslint node: true */

'use strict';

var test = require('tape');

var mygeoip = require('../../lib/mygeoip.js');

test('retrieve geo ip info', function(t) {
  mygeoip.get(function(err, json) {
    t.equals(err, null);
    t.ok(json.country, 'has a country');
    t.end();
  });
});
