/* jslint node: true, esnext: true, browser: true */

"use strict";

var React = require('react'), _ = require('lodash');

var Interface = require('./Interface.jsx');

var remote = window.electro.require('remote'), processor = remote.require('../lib/processor.js');

start(window.electro);

function start(electro) {
  var messages = [],
    send = function(type, message) {
      console.log(type, message);
      messages.push({ type, message});
      render();
    }, render = function() {
      React.render(<Interface submitTrace={submitTrace} messages={messages} />, document.getElementById('main'));
    };
  window.ipc.on('error', function(message) {
    send('Error', message);
  });
  window.ipc.on('hop', function(hop) {
    send('Hop', hop);
  });
  window.ipc.on('pass', function(message) {
    send('Pass', message);
  });
  window.ipc.on('done', function(message) {
    send('Done', message);
  });
  window.ipc.on('submitted', function(message) {
    send('Submitted', message);
  });
  window.ipc.on('submitted-error', function(message) {
    send('Submitted-errorj', message);
  });
  render();
}

function send(type, message) {
  console.log(type, message);
}
function submitTrace(options) {
  console.log('submitTrace', options, send);
  processor.doTrace(options, send);

//  window.ipc.send('run-trace', options);
}
