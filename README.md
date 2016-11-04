# IXmaps Client
`v1.0` released December 7, 2015

**IXmapsClient** is an internet mapping tool that allows you to see how your personal data travels across the internet. It works by generating traceroute data to determine the paths your data packets take. These contributions are submitted to the ixmaps.ca server, where they are visualized geographically for public display and analysis.

IXmapsClient is based on node.js and sets up a web server that only answers queries from your host, then opens a browser page to access the interface. IXmapsClient runs on port 2040.

The application is available at:
[www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php)

Source code is available at:
[github.com/ixmaps/ixnode](https://github.com/ixmaps/ixnode)

## Contributors
  * David H. Mason
  * Andrew Clement
  * Antonio Gamba-Bari
  * Colin McCann
  * Dawn Walker   
  
## Installation and Running
IXmapsClient_v.1.0 works on **Mac OS X** and **Linux**, if you are interested in a Windows version please contact us.

As of December 7, 2015 IXmaps has moved to using IXmapsClient instead of TRgen to collect routing information. The Mac OS X, Linux, and Windows versions of TRgen are deprecated. 

### Mac OS X
This version of the software has been tested and runs on Mac OS X:
* 10.6
* 10.7
* 10.8
* 10.9
* 10.10

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

1. Double click on the **IXmapsClient.1.0.6.macos.dmg** to open it
2. Drag the IXmapsClient.app application to your Applications folder
3. To launch double click on IXmapsClient.app

#### Installation Note:
Depending on your Security & Privacy settings, OS X may disallow installation of the IXmapsClient. This is part of OS X called “[Gatekeeper](https://support.apple.com/en-us/HT202491),” to adjust these settings please open **Apple menu > System Preferences… > Security & Privacy > General tab** and under the header **"Allow applications downloaded from"** select **Anywhere**.

**IXmapsClient** needs to be executed in a terminal with administrator's privileges. For this reason, when double clicking **IXmapsClient.app**, a new terminal window will be opened asking for the administrator's password.

Type the password and press return. This will open **IXmapsClient** on your default internet browser.

#### Removing IXmapsClient
1. Move the **IXmapsClient.app** application from your **Applications** folder to the Trash

This will completely remove the IXmaps Client from your computer  


### Linux
This version of the software has been tested and runs on Mac OS X:
* Ubuntu 14.04.2 LTS

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

1. Extract the contents of the file **IXmapsClient.1.0.6.linux.zip** 
2. Open a Terminal window and go to IXmapsClient directory
3. To launch type the following command: `sudo ./node server.js`.

**IXmapsClient** needs to be executed in a terminal with administrator's privileges. For this reason, when runing the application you will be asked for the administrator's password.

Type the password and press return. This will open **IXmapsClient** on your default internet browser.

The IXmapsClient interface should appear in your browser, or use your browser to go to [http://localhost:2040/](http://localhost:2040/).


### Windows
This version of the software has been tested and runs on Windows 64 bit architecture::
* Windows 7
* Windows 10

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

1. Unzip the file **IXmapsClient_v.1.0.6.win.zip**
2. Move the directory IXmapsClient to your local drive C:\ (Note that the application should be located in **C:\IXmapsClient**)
3. Copy the **IXmapsClient-Shortcut** to your Desktop
4. In order to allow the IXmapsClient to run properlly, you will need to Authorize Windows Firewall to allow raw-sockets. We are currently working on a new installer that will assist you in setting this permissions.
4. To launch double click on **IXmapsClient-Shortcut**

**IXmapsClient** needs to be executed in a terminal with administrator's privileges. For this reason, when double clicking **IXmapsClient-Shortcut**, a new terminal window will be opened asking permission to run the application as an administrator.

This will open **IXmapsClient** on your default internet browser.

#### Removing IXmapsClient
1. Delete the **C:\IXmapsClient** directory
2. Delete the **IXmapsClient-Shortcut** from your **Desktop** 

This will completely remove the IXmaps Client from your computer  
  

## License
IXmapsClient and this repository [github.com/ixmaps/ixnode](https://github.com/ixmaps/ixnode)
is licensed under a GNU AGPL v3.0 license.

Copyright (C) 2015  IXmaps

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see [gnu.org/licenses](https://gnu.org/licenses/agpl.html) <[https://gnu.org/licenses/agpl.html](https://gnu.org/licenses/agpl.html)>.

## Development
Contributions to improve the IXmaps Client are welcome!

### Install and build packages
IXmaps Client is based on node.js. For installation, https://github.com/creationix/nvm seems to work well. Once installed, use `nvm install iojs`

You will also need appropriate build tools for your OS installed (eg build-essentials, or on Mac OS, the basic XCode).

Then:

`$ npm install -g gulp && npm install && gulp build && npm run-script webpack-production`

### Executing

#### Run the server

Since you're accessing raw sockets, you must run as root (eg sudo). Make sure your root user has node available.

`# npm start`

This should also launch your web browser pointing to the local TRgen interface. If the interface can't be opened, you can manually go to http://localhost:2040

IXnode can also be run as a public service, which should be used with caution. `npm run-script public`.

### Packaging

#### Command line execution

`# node trace-raw`

use -h for help.
