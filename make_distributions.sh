#!/bin/sh

# make distributions for IXnode

MODS="async cheerio express open raw-socket2 request socket.io"
BASE="lib README.md server.js trace-platform.js trace-raw.js web"

if [ ! -d dist ]; then mkdir dist; fi
for i in linux darwin win32 win64 ; do
  if [ ! -d dist/$i/node_modules ]; then mkdir -p dist/$i/node_modules; fi
  for m in $MODS; do
    cp -a node_modules/$m dist/$i/node_modules/; 
  done
  for f in $BASE; do
    cp -a $f dist/$i/
  done 
done



