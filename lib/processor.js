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

var socketTrace = require('./socket-trace.js'), trsets = require('./trset'), platformTraceroute = require('../lib/platform-traceroute.js');

var SUBMIT_URI = 'https://www.ixmaps.ca/application/controller/gather_tr.php';
// var SUBMIT_URI = 'http://localhost:8000/application/controller/gather_tr.php';

var cancelTrace, submitted = 0;

// start the trace
exports.submitTraceOptions = function(allOptions, send) {
  cancelTrace = false;
  // submitting hosts from a trset
  if (allOptions.trset) {
    trsets.getTrset(allOptions.trset, function(err, dests) {
      var total = dests.length;
      send('info', 'TRSET ' + JSON.stringify(dests));
      if (err) {
        send('error', 'cannot retrieve trset ' + allOptions.trset + ': ' + err);
      } else {
        var failed = 0, succeeded = 0;
        var submitter = function(err, res) {
          if (err) {
            send('error', err);
            failed++;
          } else if (res) {
            succeeded++;
          }
          var dest = dests.shift();

          if (dest && !cancelTrace) {
            var current = (total - dests.length);
            send('STATUS', 'Host ' + dest, {status: 'host', total: total, current: current});
            var dest_options = _.assign({}, allOptions, {dest: dest});

            send('info',  'now running ' + dest + ' from ' + allOptions.trset);
            doTrace(dest_options, send, submitter);
          } else {
            send('info', 'done ' + allOptions.trset);
            send('STATUS', `TR Set ${allOptions.trset} completed. ${succeeded} of ${total} successfully contributed.`, {status: 'trset-completed', trset: allOptions.trset, succeeded, total});
          }
        };
        submitter();
      }
    });
  // submitting a single host
  } else {
    var dest = allOptions.dest;
    var dest_options = _.assign({}, allOptions, {dest: dest});
    send('STATUS', 'Host ' + dest, {status: 'host'});
    doTrace(dest_options, send, function(err, res) {
      send('info', 'done host ' + dest);
      send('STATUS', 'done', {status: 'done'});
    });
  }
};

exports.cancelTrace = function() {
  cancelTrace = true;
};

function doTrace(options, send, doneDestCallback) {
  send('info', 'options' + JSON.stringify(options, null, 2), {dest: options.dest});

  if (!net.isIP(options.dest)) {
    // resolve a symbolic address
    dns.resolve4(options.dest, function(err, addresses) {
      if (err) {
        send('STATUS', 'done', {dest: options.dest, dest_ip: options.dest_ip});
        doneDestCallback('cannot resolve host "' + options.dest + '"', {status: 'error', dest: options.dest});
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
    let submission = {
      timeout: options.timeout,
      queries: options.queries,
      dest: options.dest,
      dest_ip: options.dest_ip,
      submitter: options.submitter,
      city: options.city,
      postal_code: options.postal_code,
      maxhops: options.maxhops,
      os: require('os').type(),
      traceroute_submissions: results
    };
    if (err) {
      submission.error = JSON.stringify(err);
    }

    if (global.debug) console.log('submitting', submission);
    if (options.nosubmit) {
      return;
    }
    console.log('SUBMITTRACE post', JSON.stringify(submission, null, 2));
    request.post(SUBMIT_URI, {
      form: submission
    },
      function(err, res, body) {
        if (!err && res.statusCode == 200) {
          var trid, submissionMessage;
          try {
            var json = JSON.parse(res.body);
            trid = json.TRid;
            submissionMessage = json.message || 'no message';
          } catch (e) {
            send('error', 'submission error ' + JSON.stringify(e), {dest: options.dest, dest_ip: options.dest_ip});
            return;
          }
          submitted++;
          send('submitted', `Processed ${options.dest} (${options.dest_ip}) - TRID ${trid}`, {status: 'submitted', trid, submissionMessage, dest: options.dest, dest_ip: options.dest_ip, submitted});
        } else {
          send('submitted', `Error for ${options.dest} (${options.dest_ip}) ${err}`, {status: 'error', err, dest: options.dest, dest_ip: options.dest_ip});
        }
        doneDestCallback(err, res);
      });
  }
}
