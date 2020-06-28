/* jslint node: true */
"use strict";

var request = require('request');

var TRSETS_BASE = 'https://www.ixmaps.ca/application/controller/trsets.php';
// var TRSETS_BASE = 'http://localhost:8000/application/controller/trsets.php';

var trsets;

exports.getTrsets = function(callback) {
  if (trsets) {
    callback(null, trsets);
    return;
  }

  request.post(TRSETS_BASE, {
    json: {
      action: 'getTrsets'
    }
  }, (error, res, body) => {
    trsets = ['All targets'];
    for (var key in body) {
      var value = body[key];
      trsets.push(value['name']);
    }

    callback(error, trsets);
  });

};

exports.getTrset = function(name, callback) {
  request.post(TRSETS_BASE, {
    json: {
      action: 'getTrset',
      target: name
    }
  }, (error, res, body) => {
    var urls = [];
    for (var key in body) {
      var value = body[key];
      urls.push(value['url']);
    }

    callback(error, urls);
  });
};
