/* jslint node: true */

'use strict';

var path = require('path');
var express = require('express'),
  app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// dev webpack proxy
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

var production = process.env.NODE_ENV === 'production', trsets = require('./lib/trset.js');

var processor = require('./lib/processor.js');

var socket;

app.use(express.static(path.join(__dirname, 'web')));

// proxy webpack for frontend script
if (!production) {
  app.all('/assets/frontend.js', function(req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:2050'
    });
  });
}

// send messages to the client, with logging
function send(type, message, content) {
  console.log(type + ': ' + message.toString());
  socket.emit('update', {
    type: type,
    message: message,
    content: content
  });
}


io.on('connection', function(s) {
  socket = s;
  console.log('Connection');
  trsets.getTrsets(function(err, sets) {
    if (err) {
      console.error('cannot get trsets', err);
      return;
    }
    console.log('trsets', sets.length);
    socket.emit('trsets', sets);
  });
  socket.on('submitTrace', submitTrace);
  socket.on('cancelTrace', cancelTrace);
});

function submitTrace(options) {
  send('info', JSON.stringify(options));
  processor.submitTraceOptions(options, send);
}

function cancelTrace() {
  send('STATUS', 'Cancelling after current host');
  processor.cancelTrace();
}

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/web/index.html');
});

server.listen(2040, 'localhost');

server.on('listening', function() {
  console.log('Express server started on port %s at %s. Production: %s', server.address().port, server.address().address, production);
});
