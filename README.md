# IXnode

We've found Electron creates too many cross platform installation issues and are switching to a local server implementation.

IXnode is open source software (based on io.js and Electron) that generates traceroute data used to determine the paths packets take to different sites. It can be installed and executed from a built release on the [Contribute page of the IXmaps web site](https://www.ixmaps.ca/contribute.php) or by [downloading and setting up the development version](https://github.com/ixmaps/ixnode/). Either way, we welcome your comments and participation.

## Downloading and running IXnode

### Running on Linux

### Running on MacOS X

### Running on Windows

## Developing IXnode

Since IXnode is an open source project, anyone can download its sources, inspect them, and make pull requests which can be integrated into the main project for fixes and improvements.

### Install and build packages

You will need the iojs version of node. For installation, https://github.com/creationix/nvm seems to work well. Once installed, use `nvm install iojs`

You will also need appropriate build tools for your OS installed (eg build-essentials, or on Mac OS, the basic XCode).

Then:

`$ npm install -g gulp && npm install && gulp build`

### Executing

#### Run the server

Since you're accessing raw sockets, you must run as root (eg sudo). Make sure your root user has node available.

`# npm start`

### Packaging


#### Command line execution

`# node trace-raw`

use -h for help.

Note you should **not** run `npm run-script build-electron` before using the command line version (the compiled raw-socket2 is for a different version). If required, remove node_modules and re-run `npm install` before using run-trace.
