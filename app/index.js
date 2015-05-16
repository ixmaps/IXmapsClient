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
  GLOBAL.win = mainWindow;
});

ipc.on('run-trace', function(event, options) {
  const sendTrace = require('../lib/sendTrace.js'), send = function(type, message) {
    console.log(type, message);
    event.sender.send(type, message);
  }, platformTraceroute = require('../lib/platform-traceroute.js');


  let results = {}, expected = 2,
    finished = function(platform, result) {
      results[platform] = result;
      if (Object.keys(results) < expected) {
        return;
      }
      sendTrace.submitTrace(options, Object.keys(results).map(function(r) { return results[r]; }), function(err, res, body) {
        if (!err && res.statusCode == 200) {
          send('submitted', body);
        } else {
          send('submitted-error', err, res, body);
        }
      });
    },
    rawProcessor = {
      hops: [],
      p: 0,

      error: function(error) {
        send('error', error);
      },
      hop: function(err, hop) {
        this.hops.push(hop);
        send('hop', hop);
      },
      pass: function(pass) {
        this.p++;
        send('pass', this.p);
      },
      done: function(err, res) {
        send('done', err, res);
        finished('ixjs 0.0.1', { protocol: 'icmp', tr_data: this.hops });
      }
    }, trProcessor = {
      data: function(output) {
        send('output', output);
      },
      end: function(output) {
        send('end', output);
        finished('platform', { protocol: 'icmp', tr_data: output });
      },
      error: function(err) {
        send('error', err);
      }
    }, runTrace = function() {
      expected = 1;
      sendTrace.doTrace(options, rawProcessor);
      if (options.include_platform_traceroute) {
        expected = 2;
        platformTraceroute(options, trProcessor);
      }
    };
  console.log('options', JSON.stringify(options, null, 2));

  var net = require('net'), dns = require('dns');
  if (!net.isIP(options.dest)) {
    // resolve a symobolic address
    dns.resolve4(options.dest, function(err, addresses) {
      if (err) {
        send('error', 'cannot resolve host');
      } else {
        options.dest_ip = addresses[0];
        runTrace();
      }
    });
  } else {
    options.dest_ip = options.dest;
    runTrace();
  }

  //sendTrace.runTrace(options.dest, options, rawProcessor);
  event.sender.send('raw-trace-response', 'started');

});
