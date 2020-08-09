# IXmaps Client
Version 1.1.1 released Jun 2, 2020

**IXmapsClient** is an internet mapping tool that allows you to see how your personal data travels across the internet. It works by generating traceroutes to determine the paths your data packets take. These contributions are submitted to the ixmaps.ca server, where they are visualized geographically for public display and analysis.

**IXmapsClient** sets up a local web server that only answers queries from your device, then opens a browser page to access the interface via port 2040.

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

### Installation
This version of the software has been tested and runs on:
* Ubuntu 20.04.3 LTS

Note: If you have previously installed a version of the **IXmapsClient**, you must remove it before proceeding (see below for uninstall instructions).

The current version of the client can be downloaded from [www.ixmaps.ca/contribute](https://www.ixmaps.ca/contribute.php).

1. Download the IXmapsClient installer **IXmapsClient.1.1.1.linux.tar.gz**
2. Extract the contents of the file **IXmapsClient.1.1.1.linux.tar.gz** with the Archive Manager or by running the following command in a terminal window: `tar xzvf IXmapsClient.1.1.1.linux.tar.gz`
3. In the terminal window, navigate to the directory where **IXmapsClient** was extracted (for more details, see e.g. [Ubuntu/Using the Terminal](https://help.ubuntu.com/community/UsingTheTerminal))
4. Type the following command to launch the application: `./start.sh`

**IXmapsClient** needs to be executed in a terminal with administrator's privileges. For this reason, when running the application you may be asked for the administrator's password; enter your admin password to proceed. The **IXmapsClient** interface should then be shown in a new browser window, or use your browser to go to http://localhost:2040/.

#### Removing IXmapsClient
Delete the **IXmapsClient** folder. In a Linux terminal window, navigate to the directory where **IXmapsClient** resides, then you run the following command: `rm -r IXmapsClient`
This will completely remove the **IXmapsClient** from your computer.


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
