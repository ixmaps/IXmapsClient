# IXnode

Based on io.js and Electron.

IXnode is open source software used to execute network traces used to determine the physical location of packets going to different sites. It can be installed and executed from a built release on the [IXmaps web site](https://www.ixmaps.ca/) or by [downloading and setting up the development version](https://github.com/ixmaps/ixnode/). Either way, we welcome your comments and participation.

## Downloading and running IXnode

If you're reading this document from within a downloaded IXnode distribution, you can run the software from here.

IXnode uses raw sockets so requires your system's administrator (root) access. 

### Running on Linux

After downloading the built package, extract it. Go to your system's command line / terminal (in many graphical environments, press Control-Alt-t), and change to the extracted directory. Run this command:

`$ sudo ./ixnode`

You'll be prompted for your administrator password, then the IXnode interface will appear.

### Running on MacOS X

After downloading the built package, extract it. In the Finder, navigate to /Applications/Utilities and double click on terminal. You'll be on the command line. In it, type these commands:

`$ cd <directory you extracted IXnode to>`

`$ sudo Contents/MacOS/Electron`

You'll be prompted for your administrator password, then the IXnode interface will appear.

### Running on Windows

After downloading the built package, extract it. Go to the extracted directory, right-click on ixnode.exe and choose "Run as Administrator."

## Developing IXnode

Since IXnode is an open source project, anyone can download its sources, inspect them, and make pull requests which can be integrated into the main project for fixes and improvements.

### Install and build packages

You will need the iojs version of node. iojs is currently version 2.0.1. For installation, https://github.com/creationix/nvm seems to work well. Once installed, use `nvm install iojs`

You will also need appropriate build tools for your OS installed (eg build-essentials, or on Mac OS, the basic XCode).

Then:

`$ npm install -g gulp && npm install && gulp build`

### Executing

Before executing the Electron app, you will need to build the modules for Electron's version of the Javascript engine.

`$ npm run-script build-electron`

Note this means you will need to re-install the modules for your node version if using command line execution (see below).

More information: https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md

#### Run Electron

Since you're accessing raw sockets, you must run as root (eg sudo). Make sure your root user has node available.

`# npm start`

### Packaging

Run `$ npm run-script package-[linux|darwin|win32]` as required.

The generated Electron package will be under dist and should be run as root.

#### Command line execution

`# node trace-raw`

use -h for help.

Note you should **not** run `npm run-script build-electron` before using the command line version (the compiled raw-socket2 is for a different version). If required, remove node_modules and re-run `npm install` before using run-trace.
