/* jslint node: true, esnext: true, browser: true */
'use strict';

require('@babel/polyfill');
var React = require('react'), { Row, Alert } = require('react-bootstrap'), io = require('socket.io-client'), _ = require('lodash'), createReactClass = require('create-react-class');

var Submitter = require('./Submitter.jsx'),
    Destination = require('./Destination.jsx'),
    Options = require('./Options.jsx'),
    Trace = require('./Trace.jsx'),
    Finished = require('./Finished.jsx'),
    DefaultOptions = require('../../lib/default-options.js');

var socket = io();

module.exports = createReactClass({
  connected: function() {
    console.log('connected');
    this.setState({disconnected: false});
  },
  ack: function() {
    this.state.ack = new Date().getTime();
    if (this.state.disconnected) {
      this.setState({disconnected: false});
    }
  },
  stale: function(g) {
    this.setState({stale: true});
    clearInterval(this.state.ackInterval);
  },
  preferences: function(prefs) {
    let options = _.assign({}, this.state.options, {submitter: prefs.submitter, postal_code: prefs.postal_code});
    this.setState({options});
  },
  geoip: function(geoip) {
    let options = _.assign({}, this.state.options, {geoip});
    this.setState({options});
  },
  trsets: function(trsets) {
    // this.setState(...this.state, {trsets});
    this.setState({trsets: trsets});
  },
  disconnected: function() {
    console.log('disconnect');
  },
  update: function(incoming) {
    let { type, message, content } = incoming, messages = [...this.state.messages];
    // program information
    if (content) {
      if (content.status) {
        this.state.currentStatus = content.status;
        this.state.statusMessage = message;
        this.state.progress = incoming.content;
      }
      if (content.submitted) {
        this.state.submitted = content.submitted;
      }
    }
    messages.push({ date: new Date(), type, message, content });
    this.setState(...this.state, {messages});
  },
  submitTrace: function(options) {
    this.state.currentStatus = null;
    socket.emit('submitTrace', options);
  },
  cancelTrace: function() {
    socket.emit('cancelTrace');
  },
  componentDidMount: function() {
    socket.on('update', this.update);
    socket.on('trsets', this.trsets);
    socket.on('connect', this.connected);
    socket.on('pong', this.ack);
    socket.on('stale', this.stale);
    socket.on('disconnect', this.disconnected);
    socket.on('preferences', this.preferences);
    socket.on('geoip', this.geoip);

    let gen = new Date().getTime();
    this.state.ackInterval = setInterval(() => {
      if (this.state.ack) {
        if (new Date().getTime() - this.state.ack > 20000) {
          this.setState({disconnected: true});
        }
      }
      socket.emit('ping', gen, this.state.ack > 0);
    }, 500);
  },
  getInitialState: function() {
    return {
      options: DefaultOptions(),
      messages: [],
      step: 'Submitter',
      currentStatus: null,
      statusMessage: null,
      trsets: null,
      ack: 0,
      lastPage: 'Submitter',
      submitted : 0
    };
  },
  render: function() {
    let message;
    if (this.state.stale) {
      message = (
        <Alert bsStyle='danger'>
          <h1>Stale client</h1>
          <p>This window should be closed since an active window is open. Check your other browser windows or refresh this window.</p>
       </Alert>
      );
    } else if (this.state.disconnected) {
      message = (
        <Alert bsStyle='danger'>
          <h1>Server disconnected</h1>
          <p>The server is not responding to ping requests. It may be necessary to restart it.</p>
       </Alert>
      );
    }
    let step;

    switch (this.state.step) {
    case 'Destination':
      step = <Destination caller={this} options={this.state.options} trsets={this.state.trsets}/>;
      break;
    case 'Options':
      step = <Options caller={this} defaultOptions={DefaultOptions()} options={this.state.options}/>;
      break;
    case 'Trace':
      step = <Trace caller={this} currentStatus={this.state.currentStatus} statusMessage={this.state.statusMessage} messages={this.state.messages} options={this.state.options} progress={this.state.progress} />;
      break;
    case 'Finished':
      step = <Finished submitted={this.state.submitted} caller={this} lastPage={this.state.lastPage} />
      break;
    default:
      step = <Submitter caller={this} options={this.state.options} />;
    }

    return (
      <div className="container">
        {message}
        <Row className="col-md-12">
          <form className='form-horizontal'>
            {step}
          </form>
        </Row>
      </div>
    );
  },
  stepCall: function(to, opts, fields) {
    if (fields) {
      fields.forEach(i => {
        this.state.options[i] = opts[i];
      });
    } else if (to === 'Finished') {
      this.state.lastPage = opts;
    }
    // don't default to these anymore
    delete this.state.options.geoip;

    this.setState({
      step: to
    });
    if (to === 'Trace') {
      this.submitTrace(this.state.options);
    }
  },
  savePrefs: function(prefs) {
    socket.emit('savePreferences', prefs);
  }
});