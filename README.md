# IXclient

Based on io.js and Electron.

## Install and build packages

You will need the iojs version of node and build tools for your OS installed. For node installation,
https://github.com/creationix/nvm seems to work well. Once installed, use `nvm install iojs`

Then:

`$ npm install -g gulp && npm install && gulp build && npm run-script build-electron`

More information: https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md

## Executing

### Run Electron

Since you're accessing raw sockets, you must run as root (eg sudo). Make sure your root user has node available.

`# npm start`

## Packaging

Run `$ npm run-script package-[linux|darwin|win32]` as required.

The generated Electron package will be under dist and should be run as root.

### Command line execution

`# node trace-raw`

Note you should not run `npm run-script build-electron` before using the command line version (the compiled raw-socket2 is for a different version). If required, remove node_modules and re-run `npm install` before using run-trace.

use -h for help.
