/* jslint node: true, esnext: true */


var React = require('react');

var InputForm = require('./InputForm.jsx');

start(window.electro);

function start(electro) {
    var remote = electro.require('remote');
    window.ipc.on('raw-trace-result', function(message) {
      console.log('result', message);
    });
    React.render(<InputForm submitTrace={submitTrace} />, document.getElementById('main'));
}

function submitTrace(options) {
  console.log(options);

  window.ipc.send('raw-trace', options);
}
