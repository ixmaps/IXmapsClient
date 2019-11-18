/* jslint node: true */

'use strict';

var request = require('request');

var GEO_URI = 'https://www.ixmaps.ca/application/controller/mygeoip.php';

exports.get = function(cb) {
  request(GEO_URI, function(err, res, body) {
    var json;
    if (!err) {
      json = JSON.parse(body);
    }
    cb(err, json);
  });
};
