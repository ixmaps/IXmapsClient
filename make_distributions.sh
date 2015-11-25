#!/bin/sh

# make distributions for IXmapsClient

MODS="lodash open async cheerio express open raw-socket request socket.io"
BASE="start.sh lib README.md server.js trace-platform.js trace-raw.js web"


if [ ! -d dist ]; then mkdir dist; fi
for i in linux ixmaps-darwin win32 win64 ; do
  if [ ! -d dist/$i/node_modules ]; then mkdir -p dist/$i/node_modules; fi
  for m in $MODS; do
    rsync -a --delete-after node_modules/$m dist/$i/node_modules/;
  done
  # socket.io weirdness
  if [ ! -d dist/$i/node_modules/socket.io/node_modules/socket.io-client ]; then rsync -a node_modules/socket.io-client dist/$i/node_modules/socket.io/node_modules/; fi
  for f in $BASE; do
    rsync -a --delete-after $f dist/$i/
  done
done

# MacOS
cp macos/start.sh dist/ixmaps-darwin/
