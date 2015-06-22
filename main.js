/* jslint node: true, esnext: true */

"use strict";

var app = require('app'), BrowserWindow = require('browser-window');

// prevent window being GC'd
var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  var Menu = require('menu')
  console.log('ready');
  // main.js

  var platform = require('os').platform(), menus, quit, copy, paste, selectAll;
  // sigh
  if (platform === 'darwin') {
    quit = { label: 'Quit', accelerator: 'Command+Q', click: function() { app.quit(); } };
    copy = { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' };
  } else if (platform === 'win32') {
    quit = { label: 'E&xit', accelerator: 'Alt+F4', click: function() { app.quit(); } };
    copy = { label: 'C&opy', accelerator: 'Control+C', command: 'core:copy' };
  } else if (platform === 'linux') {
    quit = { label: 'Quit', accelerator: 'Control+Q', click: function() { app.quit(); } };
    copy = { label: 'C&opy', accelerator: 'Control+C', command: 'core:copy' };
  }

  menus = [
    {
      label: 'IXnode',
      submenu: [
        quit
      ]
    },
    {
      label: 'Edit',
      submenu: [
        copy
      ]
    },
  ];

  let menu = Menu.buildFromTemplate(menus);

  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1000,
    height: 750,
    resizable: true
  });
  console.log('loading');

  mainWindow.loadUrl(`file://${__dirname}/app/index.html`);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
