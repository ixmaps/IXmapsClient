/* jslint node: true */

'use strict';

// only accept local connections. default: true.

var path = require('path');
var express = require('express'), app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var open = require('open');

var mygeoip = require('./lib/mygeoip.js');

var mode = process.env.NODE_ENV,
  isWin = /^win/.test(process.platform),
  isPublic = mode === 'public' || mode === 'publicdev',
  development = mode === 'development' || mode === 'publicdev', trsets = require('./lib/trset.js');

var processor = require('./lib/processor.js');

app.use(express.static(path.join(__dirname, 'web')));
app.use('/fonts/', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/fonts')));

// proxy webpack for frontend script
if (development) {
  // dev webpack proxy
  var httpProxy = require('http-proxy');
  var proxy = httpProxy.createProxyServer();

  app.all('/assets/frontend.js', function(req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:2050'
    });
  });
}

var lastResponse, hasRoot = false, gen, pingCheck;

try {
  process.setuid(0);
  hasRoot = true;
} catch (e) {
  open('http://localhost:2040/requires-root.html');
  setTimeout(function() {
    process.exit(0);
  }, 2000);
}

if (hasRoot) {
  start();
}

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/web/index.html');
});

if (!isPublic) {
  server.listen(2040, 'localhost');
} else {
  server.listen(2040);
}


server.on('listening', function() {
  console.log('\n\nIXmapsClient server started at http://%s:%s\nDevelopment mode: %s', server.address().address, server.address().port, development);
  if (isPublic) {
    console.error('WARNING: running in public mode. Will accept any connection.');
  }
});

function start() {
  // open the user's preferred browser to the interface
  if (!isPublic) {
    try {
      process.setuid(process.env.USER);
      open('http://localhost:2040');
      process.setuid(0);
    } catch (e) {
      console.log('\nUnable to open a browser window to this application automatically. Please access it at http://localhost:2040. Thanks.\n');
    }
  }

  io.on('connection', function(socket) {
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
    socket.on('savePreferences', savePreferences);
    socket.on('cancelTrace', cancelTrace);
    // initiate client version and presence check
    socket.on('ping', function(g, ack) {
      lastResponse = new Date();
      if (!gen || !ack) {
        gen = g;
        try {
          var prefs = require(process.cwd() + '/IXmaps.preferences.json');
          console.log('sending prefs', prefs);
          socket.emit('preferences', prefs);
        } catch (err) {
          console.log('no IXmaps.preferences.json found', err);
        }
        try {
          mygeoip.get(function(err, geoip) {
            console.log('sending geoip', geoip);
            socket.emit('geoip', geoip);
          });
        } catch(err) {
          console.error('could not get geoip', err);
        }
        if (!isPublic) {
          pingCheck = setInterval(function() {
            var passed = new Date().getTime() - lastResponse.getTime();
            if (passed > 1000) {
              console.log('passed', passed);
            }
            if (passed > 3000) {
              console.log('exiting due to no client response');
              process.exit(0);
            }
          }, 500);
        }
      } else if (gen !== g && !isPublic) {
        socket.emit('stale', gen);
        return;
      }
      socket.emit('pong', gen);
    // start ping check to keep alive while client is open
    });

    // send messages to the client, with logging
    function send(type, message, content) {
      console.log(type + ': ' + message.toString());
      socket.emit('update', {
        type: type,
        message: message,
        content: content
      });
    }

    function submitTrace(options) {
      send('info', JSON.stringify(options));
      processor.submitTraceOptions(options, send);
    }

    function savePreferences(prefs) {
      try {
        require('fs').writeFileSync(process.cwd() + '/IXmaps.preferences.json', JSON.stringify(prefs));
      } catch (e) {
        console.error('could not save preferences', e);
      }
    }

    function cancelTrace() {
      send('STATUS', 'Stopping after current host', {status: 'stopping'});
      processor.cancelTrace();
    }

  });
}
