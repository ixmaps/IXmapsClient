/* jslint node: true */
"use strict";


var request = require('request'), cheerio = require('cheerio');

var TRSETS_BASE = 'http://ixmaps.ca/trsets/';

var trsets;

exports.getTrsets = function(callback) {
  if (trsets) {
    callback(null, trsets);
    return;
  }

  request(TRSETS_BASE, function (error, res, body) {
    var $ = cheerio.load(body);
    trsets = [];
    $('a').each(function(i, a) {
      var v = $(a).attr('href');
      if (v.indexOf('./') === 0) {
        trsets.push(v.replace('./', ''));
      }
    });
    callback(error, trsets);
  });

};

exports.getTrset = function(name, callback) {
  request(TRSETS_BASE + name, function(err, res, body) {
    var hosts = [];
    body.split('\n').forEach(function(l) {
      if (l.indexOf('host') === 0) {
        hosts.push(l.split(' ')[1]);
      }
    });
    callback(err, hosts);
  });
};
