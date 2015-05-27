# IXclient

Based on io.js and Electron.

## Install and build packages

You will need the iojs version of node. iojs is currently version 2.0.1. For installation, https://github.com/creationix/nvm seems to work well. Once installed, use `nvm install iojs`

You will also need appropriate build tools for your OS installed (eg build-essentials, or on Mac OS, the basic XCode).

Then:

`$ npm install -g gulp && npm install && gulp build`

## Executing

Before executing the Electron app, you will need to build the modules for Electron's version of the Javascript engine.

`$ npm run-script build-electron`

Note this means you will need to re-install the modules for your node version if using command line execution (see below).

More information: https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md

### Run Electron

Since you're accessing raw sockets, you must run as root (eg sudo). Make sure your root user has node available.

`# npm start`

## Packaging

Run `$ npm run-script package-[linux|darwin|win32]` as required.

The generated Electron package will be under dist and should be run as root.

### Command line execution

`# node trace-raw`

use -h for help.

Note you should **not** run `npm run-script build-electron` before using the command line version (the compiled raw-socket2 is for a different version). If required, remove node_modules and re-run `npm install` before using run-trace.
