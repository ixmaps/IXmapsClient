# IXnode

IXnode is open source software (based on node.js) that generates traceroute data used to determine the paths packets take to different sites. IXnode sets up a web server that only answers queries from your host, then opens a browser page to access the interface. IXnode runs on port 2040. It can be installed and executed from a built release on the [Contribute page of the IXmaps web site](https://www.ixmaps.ca/contribute.php) or by [downloading and setting up the development version](https://github.com/ixmaps/ixnode/). Either way, we welcome your comments and participation.

## Downloading and running IXnode

### Running on Linux

### Running on MacOS X

### Running on Windows

## Developing IXnode

Since IXnode is an open source project, anyone can download its sources, inspect them, and make pull requests which can be integrated into the main project for fixes and improvements.

### Install and build packages

This version of TRgen is based on node.js. For installation, https://github.com/creationix/nvm seems to work well. Once installed, use `nvm install iojs`

You will also need appropriate build tools for your OS installed (eg build-essentials, or on Mac OS, the basic XCode).

Then:

`$ npm install -g gulp && npm install && gulp build && npm run-script webpack-production`

### Executing

#### Run the server

Since you're accessing raw sockets, you must run as root (eg sudo). Make sure your root user has node available.

`# npm start`

This should also launch your web browser pointing to the local TRgen interface. If the interface can't be opened, you can manually go to http://localhost:2040

### Packaging

#### Command line execution

`# node trace-raw`

use -h for help.
