/* jslint node: true */
"use strict";

var request = require('request'), cheerio = require('cheerio');

var TRSETS_BASE = 'https://www.ixmaps.ca/trsets/';

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
      if (v.indexOf('./') != 1) {
        // .split('%3A ')[1] is prettier but less descriptive
        trsets.push(v.replace('./', '').replace('.trset', '').replace(/_/g, ' ').replace('%3A', ':'));
      }
    });
    // trsets.push('testing');
    callback(error, trsets);
  });

};

exports.getTrset = function(name, callback) {
  if (name === 'testing') {
    var testing = require('fs').readFileSync('./testing.trset');
    callback(null, testing.toString().trim().split('\n'));
    return;
  }
  
  request(TRSETS_BASE + name.replace(/ /g, '_') + '.trset', function(err, res, body) {
    var hosts = [];
    body.split('\n').forEach(function(l) {
      if (l.indexOf('host') === 0) {
        hosts.push(l.split(' ')[1]);
      }
    });
    callback(err, hosts);
  });
};
