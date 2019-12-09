/* jslint node: true, esnext: true, browser: true */

"use strict";

var React = require('react');
var XReactDOM = require('react-dom');
// import Interface from './Interface.jsx';
var Interface = require('./Interface.jsx');
START HERE - import Interface is typeof undefined, which gives the same error as require Interface (which is defined as typeof function)
It might be time to hit up stackoverflow
debugger; 

XReactDOM.render(<Interface />, document.getElementById('main'));
