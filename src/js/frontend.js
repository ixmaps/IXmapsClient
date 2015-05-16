/* jslint node: true, esnext: true */


var React = require('react');

var InputForm = require('./InputForm.jsx');

start(window.electro);

function start(electro) {
    var remote = electro.require('remote'), messages = [], log = function(type, message) {
      console.log(message);
      messages.push(`${type}: ${message}`);
      render();
    }, render = function() {
      React.render(<div><InputForm submitTrace={submitTrace} /><div>{messages.map(m => <p>{m}</p>)}</div></div>, document.getElementById('main'));
    };
    window.ipc.on('error', function(message) {
      log('Error', message);
    });
    window.ipc.on('hop', function(message) {
      log('Hop', message);
    });
    window.ipc.on('pass', function(message) {
      log('Pass', message);
    });
    window.ipc.on('done', function(message) {
      log('Done', message);
    });
    window.ipc.on('submitted', function(message) {
      log('Submitted', message);
    });
    window.ipc.on('submitted-error', function(message) {
      log('Submitted-errorj', message);
    });
    render();
}


function submitTrace(options) {
  console.log(options);

  window.ipc.send('raw-trace', options);
}
