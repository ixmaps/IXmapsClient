/*

# Transmit a completed trace

Run trace, send metadata, and for traceroute type, send submissions

*/
/* jslint node: true, esnext: true */

'use strict';

var request = require('request'), net = require('net'), dns = require('dns'), _ = require('lodash');

var socketTrace = require('./socket-trace.js');

//var SUBMIT_URI = 'http://www.ixmaps.ca/application/controller/gather_tr.php';
var SUBMIT_URI = 'http://zooid.org/post.php';

// start the trace
exports.doTrace = function(options, caller) {
  socketTrace(options, caller);
};

// submit hops with options to the server
exports.submitTrace = function(options, results, cb) {
  let submission = {
    timeout: options.timeout,
    queries: options.queries,
    dest: options.dest,
    dest_ip: options.dest_ip,
    submitter: options.submitter,
    postal_code: options.postalcode,
    maxhops: options.maxhops,
    os: require('os').type(),
    traceroute_submissions: []
  };
  results.forEach(function(result) {
    submission.traceroute_submissions.push({
      client: result.client,
      protocol: 'icmp',
      tr_data: result.tr_data
    });
  });

  if (GLOBAL.debug) console.log('submitting', submission);
  require('fs').writeFileSync('submitTR.json', JSON.stringify(submission, null, 2));
  if (GLOBAL.sim) {
    return;
  }
  request.post(SUBMIT_URI, {form: submission}, cb);
};
