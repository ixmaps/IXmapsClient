#!/usr/bin/env bash 

echo
echo "IXmapsClient local server"
echo
echo "This minimal server requires root access to initiate low-level socket traces. We invite you to inspect the code for safety."
echo 
echo "A browser window for your regular user should appear. If the browser window doesn't open, please go to http://localhost:2040"
echo
echo "If you don't see the message "IXmapsClient server started" something has gone wrong. Please consult the http://www.ixmaps.ca web site."
echo

DIR=`dirname "$0"`
cd $DIR/../Resources/ixmaps-darwin

echo "UID $UID DIR $DIR USER $USER"

./node server.js

