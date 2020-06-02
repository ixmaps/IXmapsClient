#!/bin/bash

RCol='\e[0m'
BIYel='\e[1;93m'

echo
echo -e "${BIYel}IXmapsClient local server (v1.1.1)"
echo
echo -e "${RCol}Please note that this minimal server requires root access to initiate traceroute requests. We invite you to inspect the code to verify its safety and privacy protection"
echo
echo "We will now prompt for your password for sudo access, after which the server will be started. A browser window for your regular user should appear"
echo
echo "If the browser window doesn't open, please point your browser to http://localhost:2040"
echo
echo -e "If you don't see the message ${BIYel}IXmapsClient server started${RCol} something has gone wrong. Please visit http://www.ixmaps.ca/contribute.php for assistance"
echo
echo "Please note that this minimal server requires root access to initiate traceroute requests. We invite you to inspect the code to verify its safety and privacy protection"
echo
echo "For more information on IXmapsClient, please visit:"
echo "https://www.ixmaps.ca"
echo "https://github.com/ixmaps/IXmapsClient/"
echo
sudo ./IXmapsClient