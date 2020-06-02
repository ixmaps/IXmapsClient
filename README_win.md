# IXmaps Client
Version 1.1.1 released Dec 16, 2019

**IXmapsClient** is an internet mapping tool that allows you to see how your personal data travels across the internet. It works by generating traceroutes to determine the paths your data packets take. These contributions are submitted to the ixmaps.ca server, where they are visualized geographically for public display and analysis.

**IXmapsClient** sets up a local web server that only answers queries from your device, then opens a browser page to access the interface via port 2040.

As of October 2016, **IXmapsClient** replaces the former traceroute generator, **TRgen**, for collecting routing information. Running **TRgen** will produce an error message. To contribute new traceroutes to the IXmaps database, **TRgen** should be removed and the new **IXmapsClient**  specific to your operating system should be installed.


## Installation and Running
The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

**IXmapsClient** works on **Mac OS X**, **Linux**, and **Windows**.


### Windows
This version of the software runs on Windows 64 bit architecture, and has been tested and runs on the following versions of the Windows OS:
* Windows 10

Note: If you have previously installed a version of the **IXmapsClient**, you must remove it before proceeding (see below for uninstall instructions).

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

1. Download the **IXmapsClient** installer **IXmapsClient.1.1.1.win64.exe**
2. Double click on **IXmapsClient.1.1.1.win64.exe** and install the application in the directory **C:\IXmapsClient**
3. Copy the **IXmapsClient-Shortcut** to your Desktop (optional)
4. In order to allow the **IXmapsClient** to run properly, you may need to authorize **Windows Defender Firewall** to allow inbound connections (or temporarily turn the firewall off). For a detailed guide on how to change these settings, see section **Changing Windows Firewall Settings**
5. Double click on **IXmapsClient-Shortcut** to launch

**IXmapsClient** needs to be executed in a terminal with administrator's privileges. For this reason, when double clicking **IXmapsClient-Shortcut**, a new terminal window will be opened asking permission to run the application as an administrator; enter your admin password to proceed. The **IXmapsClient** interface should then appear in your browser, or use your browser to go to [http://localhost:2040/](http://localhost:2040/).

#### Changing Windows Firewall Settings

In order to allow the **IXmapsClient** to collect traceroute data, windows users have to change the configuration of the **Windows Firewall**, which by default prevents the PC from receiving inbound connections. To change these default settings follow these steps:

1. Open the **Windows Firewall** and click on **Advance Settings**
2. Click on **Windows Firewall Properties**
3. Click on the tab **Private Profile** and in the section **Inbound Connections**, select the option **Allow** from the dropdown menu
4. Click on the tab **Public Profile** and in the section **Inbound Connections**, select the option **Allow** from the dropdown menu
5. Finally, click the button **Apply** and close the **Windows Firewall**

More detailed instructions [are available here](http://www.thewindowsclub.com/how-to-configure-windows-7-firewall)

Note: We advise that you reset your default firewall settings once you have completed traceroute collection.

#### Removing **IXmapsClient**
1. Delete the **C:\IXmapsClient** directory
2. Delete the **IXmapsClient-Shortcut** from your **Desktop**
This will completely remove the IXmaps Client from your computer.


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
