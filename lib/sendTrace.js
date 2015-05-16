/*

# Transmit a completed trace

Run trace, send metadata, and for traceroute type, send submissions

*/
/* jslint node: true, esnext: true */

'use strict';

var request = require('request'), net = require('net'), dns = require('dns'), _ = require('lodash');

var socketTrace = require('./socket-trace.js');

var SUBMIT_URI = 'http://www.ixmaps.ca/application/controller/gather_tr.php';
//var SUBMIT_URI = 'http://zooid.org/post.php';
var pass, cachedPassHops = [];

exports.runTrace = function(dest, options, caller) {
  if (!net.isIP(dest)) {
    // resolve a symobolic address
    dns.resolve4(dest, function(err, addresses) {
      if (err) {
        caller.error('cannot resolve host');
      } else {
        options.dest_ip = addresses[0];
        doTrace(options, caller);
      }
    });
  } else {
    options.dest_ip = dest;
    doTrace(options, caller);
  }
};

// start the trace
function doTrace(options, caller) {
  socketTrace(options, caller);
}

// submit hops with options to the server
exports.submitTrace = function(options, hopsIn, cb) {
  let submission = {
    timeout: options.timeout,
    queries: options.queries,
    dest: options.dest,
    dest_ip: options.dest_ip,
    submitter: options.submitter,
    postal_code: options.postalcode,
    maxhops:255,
    os: require('os').type(),
    traceroute_submissions: []
  };
  submission.traceroute_submissions.push({
    client: 'ixnode v.0.0.1',
    protocol: 'icmp',
    tr_data: hopsIn
  });

  if (GLOBAL.debug) console.log('submitting', submission);
  require('fs').writeFileSync('submitTR.json', JSON.stringify(submission, null, 2));
  if (GLOBAL.sim) {
    return;
  }
  request.post(SUBMIT_URI, {form: submission}, cb);
};
