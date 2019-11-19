/* jslint node: true, esnext: true */
'use strict';

var raw = require('raw-socket');

exports.create = function(ident_length, ttl) {

  let packet = Buffer.alloc(5+ident_length);
  packet.fill(0x00);

  // Echo request
  packet[0] = 0x08;

  // Identifier
  while(ident_length--) {
    packet.writeInt8(rand(), 5+ident_length, true);
  }

  packet.writeInt8(ttl, 4, true);

  // Reset checksum
  packet[2] = 0x00; packet[3] = 0x00;
  raw.writeChecksum(packet, 2, raw.createChecksum(packet));

  return packet;
};

function rand() {
  return (Math.random()*16|0);
}
