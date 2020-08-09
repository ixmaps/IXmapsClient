# IXmaps Client
Version 1.1.1 released June 2, 2020

**IXmapsClient** is an internet mapping tool that allows you to see how your personal data travels across the internet. It works by generating traceroutes to determine the paths your data packets take. These contributions are submitted to the ixmaps.ca server, where they are visualized geographically for public display and analysis.

**IXmapsClient** sets up a local web server that only answers queries from your device, then opens a browser page to access the interface via port 2040.


## Installation and Running
The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

**IXmapsClient** works on **Mac OS X**, **Windows**, and **Linux**.


### Mac OS X
This version of the software has been tested and runs on Mac OS X:
* 10.10
* 10.11
* 10.12
* 10.13
* 10.14
* 10.15

Note: If you have previously installed a version of the **IXmapsClient**, you must remove it before proceeding (see below for uninstall instructions).

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

1. Download the IXmapsClient installer **IXmapsClient_v.1.1.1.macos.dmg**
2. Double click on the **IXmapsClient.1.1.1.macos.dmg** to open it
3. Drag the **IXmapsClient.app** application to your **Applications** folder
4. Double click on **IXmapsClient.app** to launch

IXmapsClient for macOS is not signed with an Apple Developer ID and macOS [Gatekeeper](https://support.apple.com/HT202491) security settings will not allow it to be started. To bypass Gatekeeper one time for IXmapsClient, control-click or right-click on the **IXmapsClient.app** icon and choose **Open** from the context menu. This will display the following dialog:

![Gatekeeper dialog](ixmaps_gatekeeper.png "Gatekeeper dialog")

Click the **Open** button to run launch the **IXmapsClient.app** application.

**IXmapsClient** needs to be executed in a terminal with administrator's privileges. When double clicking **IXmapsClient.app**, a new terminal window will be opened asking for the administrator's password; enter your admin password to proceed. The **IXmapsClient** interface should appear in your browser, or use your browser to go to [http://localhost:2040/](http://localhost:2040/).

#### Removing **IXmapsClient**
Move the **IXmapsClient.app** application from your **Applications** folder to the Trash. This will completely remove the **IXmapsClient** from your computer.


### Windows
This version of the software runs on Windows 64 bit architecture, and has been tested and runs on the following versions of the Windows OS:
* Windows 10

Note: If you have previously installed a version of the **IXmapsClient**, you must remove it before proceeding (see below for uninstall instructions).

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

1. Download the **IXmapsClient** installer **IXmapsClient.1.1.1.win64.exe**
2. Double click on **IXmapsClient.1.1.1.win64.exe** and install the application in the directory **C:\IXmapsClient**
3. In order to allow the **IXmapsClient** to run properly, you may need to authorize **Windows Defender Firewall** to allow inbound connections (or temporarily turn the firewall off). If **IXmapsClient** is consistently returning a message of **Insufficient Traceroute responses**, there is likely an issue with the firewall. For a detailed guide on how to change these settings, see section **Changing Windows Firewall Settings**
4. Double click on **IXmapsClient-Shortcut** to launch
5. The **IXmapsClient** interface should then appear in your browser, or use your browser to go to [http://localhost:2040/](http://localhost:2040/).

#### Changing Windows Firewall Settings

In order to allow the **IXmapsClient** to collect traceroute data, windows users have to change the configuration of the **Windows Firewall**, which by default prevents the PC from receiving inbound connections. To change these default settings follow these steps:

1. In Control Panel > System and Security, open the **Windows Defender Firewall**
2. Click on **Turn Windows Defender Firewall on or off**
3. Select the **Turn off Windows Defender Firewall** option for the network that you are connected to
5. Finally, click the button **Apply** and close the **Windows Firewall**

More detailed instructions [are available here](https://support.microsoft.com/en-ca/help/4028544/windows-10-turn-microsoft-defender-firewall-on-or-off)

Note: We advise that you reset your default firewall settings once you have completed traceroute collection.

#### Removing **IXmapsClient**
1. Run **C:\unins000** to completely remove **IXmapsClient** from your machine


### Linux
This version of the software has been tested and runs on:
* Ubuntu 20.04.2 LTS

Note: If you have previously installed a version of the **IXmapsClient**, you must remove it before proceeding (see below for uninstall instructions).

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

1. Download the IXmapsClient installer **IXmapsClient.1.1.1.linux.tar.gz**
2. Extract the contents of the file **IXmapsClient.1.1.1.linux.tar.gz**, e.g. by running the following command in a terminal window: `tar xzvf IXmapsClient.1.1.1.linux.tar.gz`
3. In the terminal window, navigate to the directory where **IXmapsClient** was extracted (for more details, see e.g. [Ubuntu/Using the Terminal](https://help.ubuntu.com/community/UsingTheTerminal))
4. Type the following command to launch the application: `sudo ./nodeIXmaps server.js`

**IXmapsClient** needs to be executed in a terminal with administrator's privileges. For this reason, when running the application you will be asked for the administrator's password; enter your admin password to proceed. The **IXmapsClient** interface should then be shown in a new browser window, or use your browser to go to http://localhost:2040/.

#### Removing IXmapsClient
Delete the **IXmapsClient** folder. In a Linux terminal window, navigate to the directory where **IXmapsClient** resides, then you run the following command: `rm -r IXmapsClient`
This will completely remove the **IXmapsClient** from your computer.


## Development

**IXmapsClient** sets up a local web server that only answers queries from your device, then opens a browser page to access the interface. **IXmapsClient** runs on port 2040.

Source code is available at: https://www.github.com/ixmaps/IXmapsClient. Contributions to improve the **IXmapsClient** are welcome!

Pre-compiled packages of **IXmapsClient** are available at: https://www.ixmaps.ca/contribute


### Install and build packages
**IXmapsClient** is based on node.js version 10. Node version manager (nvm) is often helpful for installation and tracking different versions of node - see https://github.com/nvm-sh/nvm/blob/master/README.md.

Install:
`git clone https://github.com/ixmaps/IXmapsClient.git`
`$ npm install -g gulp && npm install && gulp build && npm run-script webpack-production`

### Executing
#### Run the server
Since you're accessing raw sockets, you must run as root (i.e. sudo). Make sure your root user has node available:
`$ sudo npm run dev`
`$ gulp watch` (this seems a bit buggy atm)
`$ npm run webpack`

To build assets for production:
`$ npm run webpack-production`
(NB: the hotload is still iffy)

You can adjust the target for submissions in lib/processor.js with the SUBMIT_URI (eg change to http://localhost:8000/application/controller/gather_tr.php)

You can stop a new browser window from opening each time in server.js, commenting out open('http://localhost:2040');


### Packaging
We never quite got there on the second round (2020) of packaging. The mac one compiled ok with node pkg, the Windows and Linux ones were too finicky re: versioning etc. Instead, for those what we did was simply extract the previous (working) version from the Contribute page, update the internal files as necessary and then repackage them as per below:

#### Mac build steps
1. update version number (including the start scripts)
2. update readme with correct release date
3. 'npm run build-macos' to run the node pkg library
4. copy the generated app file into a prebuilt OSX application structure (you can use the one from a previous version). It needs to be placed in Contents/Resources/ixmaps-darwin/
5. copy 'node_modules/raw-socket/build' into the same place (Colin was never able to get pkg to build that, but this may change with future builds of pkg. See the warning generated when running 'npm run build-macos'). You can clear out some of the unnecessary pieces from the raw-socket lib, eg the Makefile etc. I believe all you need to keep is the .raw file and the .o file
6. copy 'start-macos.sh' and IXmaps.preferences.json to Contents/Resources/ixmaps-darwin/
7. set the attributes in the prefs file to blank strings
8. generate README.pdf (I used 'md-to-pdf', eg 'md-to-pdf README_mac.md')
9. create a new dmg file with Disk Utility (use File-New Image-Blank Image). 150 MB is enough
10. add the IXmapsClient, /Application shortcut and README.pdf file to the dmg
11. clean up, resize and set to readonly the dmg (in terminal)
`hdiutil resize -size 75m IXmapsClient.1.1.1.macos.dmg`
12. modify the dmg so that it opens in a New Window
`hdiutil attach IXmapsClient.1.1.1.macos.dmg`
`bless --openfolder /Volumes/IXmapsClient.1.1.1.macos`
`hdiutil detach /Volumes/IXmapsClient.1.1.1.macos/`
13. make the dmg read only (and then rename it)
`hdiutil convert IXmapsClient.1.1.1.macos.dmg -format UDRO -o IXmapsClient.1.1.1.macos.readonly.dmg`
Note - hdiutil attach and detach if you get a 'resource unavailable' error

#### Windows build steps
We used [Inno Setup](https://jrsoftware.org/isdl.php) to create the Windows installer. The wizard is very straight forward. To use the correct icons, add the following to the script (assuming the ico files are on the desktop):
`
[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\ixmaps.ico"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon; IconFilename: "{app}\ixmaps.ico"
`

#### Linux build steps
Linux users don't need fancy installers! We just tar/gzip it up:
`COPYFILE_DISABLE=1 tar -cvzf IXmapsClient.1.1.1.linux.tar.gz IXmapsClient --exclude ".DS_Store"--exclude='.*'`
(note the above was done on a Mac, hence the --excludes. You may need to exclude other things, depending on OSX's current whims)


## Contributors
* David H. Mason - independent software developer
* Andrew Clement - Faculty of Information, University of Toronto
* Antonio Gamba-Bari - Faculty of Information, University of Toronto
* Colin McCann - Faculty of Information, University of Toronto
* Dawn Walker - Faculty of Information, University of Toronto


## License
Copyright (C) 2020 IXmaps.
**IXmapsClient** and the repository [github.com/ixmaps/IXmapsClient](https://github.com/ixmaps/IXmapsClient) are licensed under a GNU AGPL v3.0 license. This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see [gnu.org/licenses](https://gnu.org/licenses/agpl.html).
