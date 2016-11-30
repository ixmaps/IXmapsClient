# IXmaps Client
Version 1.0.6 released November 4, 2016

(README updated on November 30, 2016)

**IXmapsClient** is an internet mapping tool that allows you to see how your personal data travels across the internet. It works by generating traceroutes to determine the paths your data packets take. These contributions are submitted to the ixmaps.ca server, where they are visualized geographically for public display and analysis.

**IXmapsClient** sets up a local web server that only answers queries from your device, then opens a browser page to access the interface via port 2040.

As of October 2016, **IXmapsClient** replaces the former traceroute generator, **TRgen**, for collecting routing information. Running **TRgen** will produce an error message. To contribute new traceroutes to the IXmaps database, **TRgen** should be removed and the new **IXmapsClient**  specific to your operating system should be installed.


## Installation and Running
The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

**IXmapsClient** works on **Mac OS X**, **Linux**, and **Windows**.


### Windows
This version of the software runs on Windows 64 bit architecture, and has been tested and runs on the following versions of the Windows OS:
* Windows 7
* Windows 8
* Windows 10

Note: If you have previously installed a version of the **IXmapsClient**, you must remove it before proceeding (see below for uninstall instructions).

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

1. Download the **IXmapsClient** installer **IXmapsClient.1.0.6.win64.exe**
2. Double Click on **IXmapsClient.1.0.6.win64.exe** and install the application in the directory **C:\IXmapsClient**
3. Copy the **IXmapsClient-Shortcut** to your Desktop
4. In order to allow the **IXmapsClient** to run properly, you may need to authorize **Windows Firewall** to allow inbound connections. For a detailed guide on how to change these settings, see section **Changing Windows Firewall Settings**
5. Double click on **IXmapsClient-Shortcut** to launch

**IXmapsClient** needs to be executed in a terminal with administrator's privileges. For this reason, when double clicking **IXmapsClient-Shortcut**, a new terminal window will be opened asking permission to run the application as an administrator; enter your admin password to proceed. The **IXmapsClient** interface should then appear in your browser, or use your browser to go to [http://localhost:2040/](http://localhost:2040/).

#### Changing Windows Firewall Settings

In order to allow the **IXmapsClient** to collect traceroute data, windows users have to change the configuration of the **Windows Firewall**, which by default prevents the PC from receiving inbound connections. To change these default settings follow these steps:

1. Open the **Windows Firewall** and click on **Advance Settings**
2. Click on **Windows Firewall Properties**
3. Click on the tab **Private Profile** and in the section **Inbound Connections**, select the option **Allow** from the dropdown menu
4. Click on the tab **Public Profile** and in the section **Inbound Connections**, select the option **Allow** from the dropdown menu
5. Finally, click the button **Apply** and close the **Windows Firewall**

For more illustrated instructions, [see here](http://www.thewindowsclub.com/how-to-configure-windows-7-firewall)

Note: We advise that you reset your default firewall settings once you have completed traceroute collection.

#### Removing **IXmapsClient**
1. Delete the **C:\IXmapsClient** directory
2. Delete the **IXmapsClient-Shortcut** from your **Desktop**
This will completely remove the IXmaps Client from your computer.


### Mac OS X
This version of the software has been tested and runs on Mac OS X:
* 10.6
* 10.7
* 10.8
* 10.9
* 10.10
* 10.11
* 10.12

Note: If you have previously installed a version of the **IXmapsClient**, you must remove it before proceeding (see below for uninstall instructions).

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).


1. Double click on the **IXmapsClient.1.0.6.macos.dmg** to open it
2. Drag the **IXmapsClient.app** application to your **Applications** folder
3. Double click on **IXmapsClient.app** to launch

#### Installation Note:
Depending on your Security & Privacy settings, OS X may disallow installation of the **IXmapsClient**. This is part of OS X called “[Gatekeeper](https://support.apple.com/en-us/HT202491),” to adjust these settings please open **Apple menu > System Preferences… > Security & Privacy > General tab** and under the header **"Allow applications downloaded from"** select **Anywhere**.

**IXmapsClient** needs to be executed in a terminal with administrator's privileges. For this reason, when double clicking **IXmapsClient.app**, a new terminal window will be opened asking for the administrator's password; enter your admin password to proceed. The **IXmapsClient** interface should appear in your browser, or use your browser to go to [http://localhost:2040/](http://localhost:2040/).


#### Removing **IXmapsClient**
Move the **IXmapsClient.app** application from your **Applications** folder to the Trash. This will completely remove the IXmaps Client from your computer.


### Linux
This version of the software has been tested and runs on:
* Ubuntu 14.04.2 LTS

Note: If you have previously installed a version of the **IXmapsClient**, you must remove it before proceeding (see below for uninstall instructions).

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

1. Extract the contents of the file **IXmapsClient.1.0.6.linux.tar.gz**, e.g. by running the following command in a terminal window: `tar xzvf IXmapsClient.1.0.6.linux.tar.gz`
2. In the terminal window, navigate to the directory where **IXmapsClient** was extracted (for more details, see e.g. [Ubuntu/Using the Terminal](https://help.ubuntu.com/community/UsingTheTerminal))
3. Type the following command to launch the application: `sudo ./nodeIXmaps server.js`

**IXmapsClient** needs to be executed in a terminal with administrator's privileges. For this reason, when running the application you will be asked for the administrator's password; enter your admin password to proceed. The **IXmapsClient** interface should then be shown in a new browser window, or use your browser to go to http://localhost:2040/.

#### Removing IXmapsClient
Delete the **IXmapsClient** folder. In a Linux terminal window, navigate to the directory where **IXmapsClient** resides, then you run the following command: `rm -r IXmapsClient`
This will completely remove the IXmaps Client from your computer.


## Development

**IXmapsClient** sets up a local web server that only answers queries from your device, then opens a browser page to access the interface. **IXmapsClient** runs on port 2040.

Source code is available at: github.com/ixmaps/IXmapsClient. Contributions to improve the IXmaps Client are welcome!

Pre-compiled packages of **IXmapsClient** are available at: www.ixmaps.ca/contribute

As of December 7, 2015 IXmaps began using **IXmapsClient** to generate routing application, replacing the older traceroute generator, TRgen. As of October 2016 the Windows, Mac OS X and Linux versions of TRgen are deprecated, and no longer work.

### Install and build packages
**IXmapsClient** is based on node.js. For installation, https://github.com/creationix/nvm seems to work well. Once installed, use `nvm install iojs`.

You will also need appropriate build tools for your OS installed (e.g. build-essentials on Linux, XCode on Mac OS, and on Windows Visual Studio 2015, C++ compilers).

Then:
`$ npm install -g gulp && npm install && gulp build && npm run-script webpack-production`

### Executing
#### Run the server
Since you're accessing raw sockets, you must run as root (i.e. sudo). Make sure your root user has node available:
`$ npm start`
This should also launch your web browser pointing to the local **IXmapsClient** interface. If the interface can't be opened, you can manually navigate to http://localhost:2040.
**IXmapsClient** can also be run as a public service; this should be used with caution:
`$ npm run-script public`

### Packaging
#### Command line execution
`$ node trace-raw`


## Contributors
* David H. Mason - independent software developer
* Andrew Clement - Faculty of Information, University of Toronto
* Antonio Gamba-Bari - Faculty of Information, University of Toronto
* Colin McCann - Faculty of Information, University of Toronto
* Dawn Walker - Faculty of Information, University of Toronto


## License
Copyright (C) 2016 IXmaps.
**IXmapsClient** and the repository [github.com/ixmaps/IXmapsClient](https://github.com/ixmaps/IXmapsClient) are licensed under a GNU AGPL v3.0 license. This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see [gnu.org/licenses](https://gnu.org/licenses/agpl.html).
