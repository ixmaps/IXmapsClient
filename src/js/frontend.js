/* jslint node: true, esnext: true, browser: true */

"use strict";

var React = require('react');

var remote = window.electro.require('remote'), processor = remote.require('./lib/processor.js');

var InputForm = require('./InputForm.jsx');
var trsets, messages = [], debug = false, currentStatus;

module.exports = function() {
  render();
  remote.require('./lib/trset.js').getTrsets((err, res) => {
    trsets = res;
    render();
  });
};

function render() {
  let sendMessages = [];
  for (let i = 0; i < messages.length; i++) {
    var m = messages[i];
    if (debug || m.type === 'submitted' || i == messages.length - 1) {
      sendMessages.push(m);
    }
  }
  React.render(<InputForm currentStatus={currentStatus} caller={{submitTrace, toggleDebug, cancelTrace}} trsets={trsets} messages={sendMessages} />, document.getElementById('main'));
}

function send(type, message, content) {
  console.log(type + ': ' + message.toString());
  if (type === 'STATUS') {
    currentStatus = message;
  } else {
    let date = new Date();
    messages.push({ date, type, message, content});
  }
  render();
}

function submitTrace(options) {
  currentStatus = null;
  send('info', JSON.stringify(options));
  processor.submitTraceOptions(options, send);
}

function cancelTrace() {
  send('STATUS', 'Cancelling after current host');
  processor.cancelTrace();
}

function toggleDebug(e) {
  debug = e.target.checked;
  console.log('DEBUG' + debug);
  render();
}
