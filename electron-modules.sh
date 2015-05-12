#!/bin/sh

export npm_config_disturl=https://atom.io/download/atom-shell
export npm_config_target=0.25.0
export npm_config_arch=x64
export HOME=~/.electron-gyp 
npm install raw-socket-ng

