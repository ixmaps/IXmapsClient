/* jslint node: true, esnext: true */
'use strict';

var dns = require('dns'), net = require('net');

var raw = require('raw-socket-ng'), packetFactory = require('./packet-factory');

// execute a traceroute
// options:
//   dest
//   timeout
//   maxTTL
//   passes
// hopCallback
// passCallback
// finishedCallback

module.exports = function(options, hopCB, passCB, finCB) {
  let pass = 1, ttl_level = 1;

  let trace = function() {
    let sent_packets = [];
    let timeout_loop;

    let socket = raw.createSocket({ protocol: raw.Protocol.ICMP });
    let packet = packetFactory.create(3, ttl_level);

    socket.setOption(raw.SocketLevel.IPPROTO_IP, raw.SocketOption.IP_TTL, ttl_level);

    socket.send(packet, 0, packet.length, options.address, function(err, bytes) {
      if (err) {
        hopCB(err);
      }
    });

    timeout_loop = setTimeout(function() {
      end({error: 'timeout', ttl: ttl_level, rtt: -1});
    }, options.timeout);

    sent_packets[ttl_level-1] = process.hrtime();

    socket.on('error', function (er) {
      console.trace('socket-trace');
      console.error(er.stack);
    });

    socket.on('message', function(buffer, ip) {
      clearTimeout(timeout_loop);
    // get the position of the TTL
      let pos = checkMatch(buffer, packet.slice(5), buffer.length, packet.length-6);
      if (pos > 0) {
        let ttl = buffer[pos-1];
        if (ttl > 0 && (ttl-1) in sent_packets) {
          let time = process.hrtime(sent_packets[ttl-1]);
          end(null, {ip: ip, ttl: ttl, rtt: (time[0]*1000+time[1]/1000/1000).toFixed(2)});
        }
      }
    });

    function end(err, res) {
      ttl_level++;
      socket.close();
      let src = res || err;
      let hop = { pass: pass, hop: ttl_level - 1, ttl: src.ttl, ip: src.ip, rtt: src.rtt};
      if (err) {
        hop.err = err.error;
      }
      hopCB(err, hop);

      let doPasses = function(err) {
        passCB(err);
        if (pass++ === options.queries) {
          finCB(err);
        } else {
          ttl_level = 1;
          trace();
        }
      };

      if (src.ip === options.address) {
        console.log('complete pass', pass);
        doPasses();
      } else if ((ttl_level - 1) < options.maxTTL) {
        trace();
      } else {
        console.error('maxTTL', options.maxTTL);
        doPasses({ error : 'maxTTL'});
      }
    }
  };
  trace();
};

// find the offset location
function checkMatch(buffer,sequence,blen,plen) {
  while (blen--) {
    if (buffer[blen] === sequence[plen]) {
      return (plen > 0) ? checkMatch(buffer, sequence, blen, plen-1) : blen;
    }
  }

  return 0;
}
