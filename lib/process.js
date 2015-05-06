/* jslint node: true, esnext: true */

"use strict";

var socketTrace = require('./socket-trace.js'), _ = require('lodash');

var sendTrace = require('./sendTrace.js');

var cachedPassHops = {1: []}, pass = 1, queries = 4, dest, dest_ip;

module.exports = {
  hopCB: hopCB,
  passCB: passCB,
  finCB: finCB,
  queries: queries,
  doTrace : doTrace,
  processPassHops : processPassHops
};

function doTrace(d, address) {
  dest = d;
  dest_ip = address;
  socketTrace({ address: address, timeout: 1000, queries: queries, maxTTL: 30}, hopCB, passCB, finCB);
}

function hopCB(err, res) {
  console.log('res', JSON.stringify(res));
  cachedPassHops[pass].push(res);
}

function passCB(err, res) {
//  console.log('pass', err, res);
  if (pass < queries) {
    pass++;
    cachedPassHops[pass] = [];
  }
}
function finCB(err, res) {
  console.log('fin', err);
  if (err) {
    throw err;
  }
  let processed = processPassHops(cachedPassHops);

  console.log('-----\nsubmitting\n-----');
  let details = { queries : queries, dest: dest, dest_ip: dest_ip, submitter: 'me', postal_code: 'm1m' };

  sendTrace.sendTrace(processed, details, function(err, res) {
    console.log('done', err, res);
  });
  //  console.log(_.uniq(Object.keys(queries).map(function(k) { return queries[k]; })));
}

// transforms raw trace queries into traceroute style hops
function processPassHops(passHops) {
//  console.log('found', _.uniq(Object.keys(passHops).map(function(p) { return passHops[p].map(function(h) { return h.source; }).join(','); })).length, 'routes');

  // determine routes with usage
  let found = {};
  Object.keys(passHops).forEach(function(p) {
    let pass = passHops[p];
    let ips = getIPs(pass), joined = ips.join(',');
    if (found[joined]) {
      found[joined].push(pass);
      return;
    }
    found[joined] = [pass];
  });

  let mostUsed = [];

  Object.keys(found).forEach(function(f) {
    if (found[f].length > mostUsed.length) {
      mostUsed = found[f];
    }
  });
  // create rtt hops with common routes
  let groupedHops = [];
  for (let i = 0; i < mostUsed[0].length; i++) {
    let a = [];
    mostUsed.forEach(function(h) {
      a.push(h[i]);
    });
    groupedHops.push(a);
  }

  return groupedHops;
}

function getIPs(pass) {
  return pass.map(function(h) { return h.ip; });
}
