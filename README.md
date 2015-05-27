# IXclient

Based on io.js and Electron.

## Install and build packages

You will need node and build tools for your OS installed.
https://github.com/creationix/nvm seems to work well. Once installed, use `nvm install iojs`

Then:

`$ npm install -g gulp && npm install && gulp build && npm run-script build-electron`

More information: https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md

## Executing

### Run Electron package

Since you're accessing raw sockets, you must run as root (eg sudo). Make sure your root user has node available.

`# npm start`

## Packaging

Run `$ npm run-script package-[linux|darwin|win32]` as required.

### Command line execution

`# node run-trace`

Note you should not run `npm run-script build-electron` before using the command line version (the compiled raw-socket2 is for a different version). If required, remove node_modules and re-run `npm install` before using run-trace.

use -h for help.
