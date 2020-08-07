# IXmaps Client
Version 1.1.1 released July 21, 2020

**IXmapsClient** is an internet mapping tool that allows you to see how your personal data travels across the internet. It works by generating traceroutes to determine the paths your data packets take. These contributions are submitted to the ixmaps.ca server, where they are visualized geographically for public display and analysis.

**IXmapsClient** sets up a local web server that only answers queries from your device, then opens a browser page to access the interface via port 2040.

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).


### Installation
This version of the software runs on Windows 64 bit architecture, and has been tested and runs on the following versions of the Windows OS:
* Windows 10

Note: If you have previously installed a version of the **IXmapsClient**, you must remove it before proceeding (see below for uninstall instructions).

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
