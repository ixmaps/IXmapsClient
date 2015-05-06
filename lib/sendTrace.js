/*

# Transmit a completed trace

Send metadata, and for traceroute type, send submissions

*/
/* jslint node: true, esnext: true */
'use strict';

var http = require('http');

var host = 'ixmaps.ca';
var SUBMIT_URI = 'http://' + host + '/cgi-bin/gather-tr.cgi';

exports.sendTrace = function(hopsIn, details, cb) {
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
    client: 'ixjs v.0.0.1',
    protocol: 'icmp',
    tr_data: hopsIn
  });

  if (GLOBAL.debug) console.log('submitting', submission);
  submitTR(SUBMIT_URI, submission, function(err, res) {
    if (GLOBAL.debug) console.log('server response', 'err', err, 'res', res);
    let trid, subError;
    if (err) {
      console.log('tr submission failed', err);
    } else {
      cb(err, { trid: trid, error: subError});
    }
  });
}

// submit the data and callback the result
function submitTR(url, data, callback) {
  if (GLOBAL.sim) {
    require('fs').writeFileSync('submitTR.json', JSON.stringify(data, null, 2));
  } else {
    http.get(url, function(res) {
      let data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function() {
        callback(null, data);
      });
    }).on('error', function(err) {
    callback(err);
    });
  }
}
