# IXclient

Based on io.js and Electron.

## Install and build packages

You will need node and build tools for your OS installed.
https://github.com/creationix/nvm seems to work well. Once installed, use `nvm install iojs`

Then:

`$ npm install -g gulp`

`$ npm install`
`$ gulp build`
`$ npm run-script build-electron`

More information: https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md

## Executing

### Run Electron package

Since you're accessing raw sockets, you must run as root (eg sudo). Make sure your root user has node available.

`# npm start`

### Command line execution

`# node run-trace <host>`
