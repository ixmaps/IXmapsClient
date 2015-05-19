/* jslint node: true, esnext: true, browser: true */

"use strict";

var React = require('react');

var remote = window.electro.require('remote'), processor = remote.require('../lib/processor.js');

var Interface = require('./Interface.jsx');
var messages = [];

start(window.electro);

function start(electro) {
  render();
}

function render() {
  React.render(<Interface submitTrace={submitTrace} messages={messages} />, document.getElementById('main'));
}

function send(type, message) {
  console.log(type, message);
  messages.push({ type, message});
  render();
}

function submitTrace(options) {
  console.log('submitTrace', options, send);
  processor.doTrace(options, send);

//  window.ipc.send('run-trace', options);
}
