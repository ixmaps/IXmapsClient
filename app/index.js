/* jslint node: true, esnext: true */


'use strict';
var app = require('app'), BrowserWindow = require('browser-window'), ipc = require('ipc'), dns = require('dns'), net = require('net'), _ = require('lodash');

// prevent window being GC'd
var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1000,
    height: 900,
    resizable: true
  });

  mainWindow.loadUrl(`file://${__dirname}/index.html`);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  mainWindow.webContents.send('ping', 'whoooooooh!');
});

ipc.on('raw-trace', function(event, options) {
  const sendTrace = require('../lib/sendTrace.js'), send = function(type, message) {
    console.log(type, message);
    event.sender.send(type, message);
  };

  let processor = {
    hops: [],
    p: 0,

    error: function(error) {
      send('error', error);
    },
    hop: function(err, res) {
      let hop = _.extend({pass: this.p}, res);
      this.hops.push(hop);
      send('hop', hop);
    },
    pass: function(pass) {
      this.p++;
      send('pass', this.p);
    },
    done: function(err, res) {
      send('done', err, res);
      sendTrace.submitTrace(options, this.hops, this.submitted);
    },
    submitted: function(err, res, body) {
      if (!err && res.statusCode == 200) {
        send('submitted', body);
      } else {
        send('submitted-error', err, res, body);
      }
    }
  };

  sendTrace.runTrace(options.dest, options, processor);
  event.sender.send('raw-trace-response', 'started');


});
