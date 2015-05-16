/* jslint node: true, esnext: true */


var React = require('react'), _ = require('lodash');

var Interface = require('./Interface.jsx');

start(window.electro);

function start(electro) {
  var remote = electro.require('remote'), messages = [],
    send = function(type, message) {
      console.log(type, message);
      messages.push({ type, message});
      render();
    }, render = function() {
      React.render(<Interface submitTrace={submitTrace} messages={messages} graph={graph} />, document.getElementById('main'));
    }, graph = { nodes : [], edges : [] }, lastIP;
  window.ipc.on('error', function(message) {
    send('Error', message);
  });
  window.ipc.on('hop', function(hop) {
    if (!_.findWhere(graph.nodes, {id: hop.ip})) {
      graph.nodes.push({id: hop.ip, label: hop.ip});
    }
    if (lastIP) {
      if (!_.findWhere(graph.edges, {from: lastIP, to: hop.ip})) {
        graph.edges.push({from: lastIP, to: hop.ip});
      }
    }
    lastIP = hop.ip;
    send('tried', JSON.stringify({hop, graph}));
    send('Hop', hop);
  });
  window.ipc.on('pass', function(message) {
    send('Pass', message);
    lastIP = null;
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

function submitTrace(options) {
  console.log(options);

  window.ipc.send('run-trace', options);
}
