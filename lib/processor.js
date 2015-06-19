/*

# Transmit a completed trace

Run trace, send metadata, and for traceroute type, send submissions

*/
/* jslint node: true, esnext: true */

'use strict';

var request = require('request'),
  net = require('net'),
  dns = require('dns'),
  _ = require('lodash'),
  async = require('async'),
  net = require('net'),
  dns = require('dns');

var socketTrace = require('./socket-trace.js'), trsets = require('./trset');

var platformTraceroute = require('../lib/platform-traceroute.js');
var SUBMIT_URI = 'https://www.ixmaps.ca/application/controller/gather_tr.php';
//var SUBMIT_URI = 'http://zooid.org/post.php';

// start the trace
exports.submitTraceOptions = function(allOptions, send) {
  // submitting hosts from a trset
  if (allOptions.trset) {
    trsets.getTrset(allOptions.trset, function(err, dests) {
    send('info', 'TRSET ' + dests);
      if (err) {
        send('error', 'cannot retrieve trset ' + allOptions.trset + ': ' + err);
      } else {
        var submitter = function(err, res) {
          var dest = dests.shift();
          if (dest) {
            var dest_options = _.assign({}, allOptions, {dest: dest});

            send('info',  'now running ' + dest + ' from ' + allOptions.trset);
            doTrace(dest_options, send, submitter);
          } else {
            send('info', 'finished ' + allOptions.trset);
          }
        };
        submitter();
      }
    });
  // submitting a single host
  } else {
    var dest = allOptions.dest;
    var dest_options = _.assign({}, allOptions, {dest: dest});
    doTrace(dest_options, send, function(err, res) {
      send('info', 'finished host ' + dest);
    });
  }
};

function doTrace(options, send, doneDestCallback) {
  send('info', 'options', JSON.stringify(options, null, 2));

  if (!net.isIP(options.dest)) {
    // resolve a symobolic address
    dns.resolve4(options.dest, function(err, addresses) {
      if (err) {
        send('error', 'cannot resolve host');
      } else {
        options.dest_ip = addresses[0];
        runTrace();
      }
    });
  } else {
    options.dest_ip = options.dest;
    runTrace();
  }

  function runTrace() {
    var traces = [_.partial(socketTrace, options, send)];
    if (options.include_platform_traceroute) {
      traces.push(_.partial(platformTraceroute, options, send));
    }
    async.series(traces, submitTrace);
  }

  // submit hops with options to the server
  function submitTrace(err, results) {
    console.log('RESULTS ' + JSON.stringify(results, null, 2));
    let submission = {
      timeout: options.timeout,
      queries: options.queries,
      dest: options.dest,
      dest_ip: options.dest_ip,
      submitter: options.submitter,
      postal_code: options.postal_code,
      maxhops: options.maxhops,
      os: require('os').type(),
      traceroute_submissions: results
    };
    if (err) {
      submission.error = JSON.stringify(err);
    }

    if (GLOBAL.debug) console.log('submitting', submission);
    if (options.nosubmit) {
      return;
    }
    console.log('SUBMITTRACE post', JSON.stringify(submission, null, 2));
    request.post(SUBMIT_URI, {
      form: submission
    },
      function(err, res, body) {
        if (!err && res.statusCode == 200) {
          send('submitted', JSON.stringify(res));
        } else {
          send('submitted-error', err, res, res);
        }
        doneDestCallback(err, res);
      });
  }
}
