/* jslint node: true, esnext: true */

"use strict";

var app = require('app'), BrowserWindow = require('browser-window');

var crashReporter = require('crash-reporter');

// prevent window being GC'd
var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  console.log('ready');
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1000,
    height: 900,
    resizable: true
  });
  console.log('loading');

  mainWindow.loadUrl(`file://${__dirname}/app/index.html`);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
