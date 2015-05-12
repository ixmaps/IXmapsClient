/* jslint node: true, esnext: true */


'use strict';
const app = require('app'), BrowserWindow = require('browser-window'), ipc = require('ipc');

// prevent window being GC'd
let mainWindow = null;

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

ipc.on('raw-trace', function(event, arg) {
  console.log(arg);  // prints "ping"
  require('../run-trace.js');
  event.sender.send('raw-trace-response', 'started');
});

ipc.on('synchronous-message', function(event, arg) {
  console.log(arg);  // prints "ping"
  event.returnValue = 'pong';
});
