/* jslint node: true, esnext: true */
'use strict';

var dns = require('dns'), net = require('net');

var raw = require('raw-socket'), packetFactory = require('./packet-factory');

var client = 'IXmapsClient 1.1.1';
var doAbort;

module.exports = function(options, send, donecb) {
  doAbort = false;
  var rawProcessor = {
    passes: [[]],
    p: 0,

    error: function(error) {
      send('error', error, {dest: options.dest, dest_ip: options.dest_ip});
      donecb(error);
    },
    hop: function(err, h) {
      send('hop', JSON.stringify(h), {dest: options.dest, dest_ip: options.dest_ip});
      this.passes[this.passes.length - 1].push(h);
    },
    pass: function(err, pass) {
      send('pass', this.p, {dest: options.dest, dest_ip: options.dest_ip});
      this.passes.push([]);
      this.p++;
    },
    done: function(err, result) {
      send('done', this.passes.length - 1 + ' queries', {dest: options.dest, dest_ip: options.dest_ip});
      this.passes.pop();
      donecb(null, { client: client, protocol: options.raw_protocol, tr_data: this.passes, result });
    }
  };

  let pass = 1, ttl_level = 1, seqErrors = 0;

// start a new pass
  let doPasses = function(err, lastResult) {
    rawProcessor.pass(err, pass);
    if (doAbort || pass++ >= options.queries) {
      rawProcessor.done(err, lastResult);
    } else {
      ttl_level = 1;
      trace();
    }
  };
  var trace = function() {
    let sent_packets = [], timeout_loop, unresponsiveTimeout;

    let socket = raw.createSocket({ protocol: raw.Protocol[options.raw_protocol] });
    let packet = packetFactory.create(3, ttl_level);

    socket.setOption(raw.SocketLevel.IPPROTO_IP, raw.SocketOption.IP_TTL, ttl_level);

    socket.send(packet, 0, packet.length, options.dest_ip, function(err, bytes) {
      if (err) {
        rawProcessor.error(err);
      }
    });

    timeout_loop = setTimeout(function() {
      end({error: 'timeout', ttl: ttl_level, rtt: -1});
    }, options.timeout);

    unresponsiveTimeout = setTimeout(unresponsive, options.timeout * 10);

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
      } else {
        // could not find offset
        end({error: 'offset', ttl: ttl_level, rtt: -1});
      }
    });

    function unresponsive() {
      clearTimeout(timeout_loop);
      socket.close();
      doAbort = true;
      doPasses({error: 'unresponsive'});
    }
    function end(err, res) {
      ttl_level++;
      socket.close();
      let src = res || err;
      let hop = { pass: pass, hop: ttl_level - 1, ttl: src.ttl, ip: src.ip, rtt: src.rtt};
      if (err) {
        hop.err = err.error;
        seqErrors++;
      } else {
        seqErrors = 0;
      }
      rawProcessor.hop(err, hop);

      clearTimeout(unresponsiveTimeout);
      if (src.ip === options.dest_ip) {
        console.log('complete pass', pass);
        doPasses(null, 'completed');
      } else if (((ttl_level - 1) < options.maxhops) && (seqErrors < options.max_sequential_errors) && !doAbort) {
        trace();
      } else {
        console.error('maxhops', options.maxhops);
        doPasses({ error : 'maxhops'});
      }
    }
  };
  trace();
};

exports.cancelTrace = function() {
  doAbort = true;
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
