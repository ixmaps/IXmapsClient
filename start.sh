#!/bin/bash

RCol='\e[0m'
BIYel='\e[1;93m'

echo
echo -e "${BIYel}IXnode local server"
echo
echo -e "${RCol}This minimal server requires root access to initiate low-level socket traces. We invite you to inspect the code for safety."
echo 
echo "We will now prompt for your password for sudo access, after which the server will be started. A browser window for your regular user should appear."
echo 
echo "If the browser window doesn't open, please go to http://localhost:2040"
echo
echo -e "If you don't see the message ${BIYel}IXnode server started${RCol} something has gone wrong. Please consult the http://www.ixmaps.ca web site."
echo
echo "This script is start.sh."
echo 
sudo ./node server.js



