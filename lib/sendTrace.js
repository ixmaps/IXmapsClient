/*

# Transmit a completed trace

Run trace, send metadata, and for traceroute type, send submissions

*/
/* jslint node: true, esnext: true */

'use strict';

var http = require('http'), querystring = require('querystring'),
  net = require('net'), dns = require('dns'), _ = require('lodash');

var process = require('./process.js');
var SUBMIT_HOST = 'www.ixmaps.ca', SUBMIT_PATH = '/application/controller/gather_tr.php';

exports.runTrace = function(dest, options) {
  if (!net.isIP(dest)) {
    dns.resolve4(dest, function(err, addresses) {
      if (err) {
        process.finCB('cannot resolve host');
      } else {
        options = _.extend(options, { dest_ip: addresses[0]});
        process.doTrace(options, submitTrace);
      }
    });
  } else {
    options = _.extend(options, {dest_ip: dest});
    process.doTrace(options, dest, submitTrace);
  }
};

function submitTrace(hopsIn, details, cb) {
  let submission = {
    timeout: 1,
    queries: details.queries,
    dest: details.dest,
    dest_ip: details.dest_ip,
    submitter: details.submitter,
    postal_code: details.postalcode,
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
  submitTR(submission, function(err, res) {
    if (GLOBAL.debug) console.log('server response', 'err', err, 'res', res);
    if (err) {
      console.log('tr submission failed', err);
    } else {
      cb(err, res);
    }
  });
}

// submit the data and callback the result
function submitTR(submission, callback) {
  if (GLOBAL.sim) {
    require('fs').writeFileSync('submitTR.json', JSON.stringify(data, null, 2));
  } else {
    var data = querystring.stringify(submission);

    var options = {
      host: SUBMIT_HOST,
      port: 80,
      path: SUBMIT_PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    var result = '', req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(d) {
        result += d;
      });
      res.on('error', function(err) {
        console.error('error in posting submission:', err);
      });
      res.on('end', function() {
        callback(result);
      });
    });

    req.write(data);
    req.end();
  }
}
