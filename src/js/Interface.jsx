/* jslint node: true, esnext: true, browser: true */

var React = require('react'), { Row, Alert } = require('react-bootstrap'), io = require('socket.io-client'), _ = require('lodash');
require('babel/polyfill');

var Submitter = require('./Submitter.jsx'),
  Destination = require('./Destination.jsx'),
  Options = require('./Options.jsx'),
  Trace = require('./Trace.jsx'),
  DefaultOptions = require('../../lib/default-options.js');

var socket = io();

module.exports = React.createClass({
  connected: function() {
    console.log('connected');
  },
  ack: function() {
    this.state.ack = true;
  },
  stale: function(g) {
    this.setState({stale: true});
    clearInterval(this.state.ackInterval);
    window.close();
  },
  preferences: function(prefs) {
    let options = _.assign({}, this.state.options, {submitter: prefs.submitter, postal_code: prefs.postal_code});
    this.setState({options});
  },
  trsets: function(trsets) {
    this.setState(...this.state, {trsets});
  },
  disconnected: function() {
    console.log('disconnect');
  },
  update: function(incoming) {
    let { type, message, content } = incoming, messages = [...this.state.messages];
    console.log('update', incoming);
    if (type === 'STATUS') {
      this.state.currentStatus = message;
    } else {
      messages.push({ date: new Date(), type, message, content });
    }
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
    socket.on('ack', this.ack);
    socket.on('stale', this.stale);
    socket.on('disconnect', this.disconnected);
    socket.on('preferences', this.preferences);

    let gen = new Date().getTime();
    this.state.ackInterval = setInterval(() => socket.emit('pong', gen, this.state.ack), 500);
  },
  getInitialState: function() {
    return {
      options: DefaultOptions(),
      messages: [],
      step: 'Submitter',
      currentStatus: null,
      trsets: null
    };
  },
  render: function() {
    if (this.state.stale) {
      return (
        <Alert bsStyle='danger'>
          <h1>Stale client</h1>
          <p>This window should be closed since an active window is open. Check your other browser windows or refresh this window.</p>
       </Alert>
      );
    }
    let sendMessages = [], step;

    switch (this.state.step) {
    case 'Destination':
      step = <Destination caller={this} options={this.state.options} trsets={this.state.trsets}/>;
      break;
    case 'Options':
      step = <Options caller={this} defaultOptions={DefaultOptions()} options={this.state.options}/>;
      break;
    case 'Trace':
      step = <Trace caller={this} currentStatus={this.state.currentStatus} messages={this.state.messages} />;
      break;
    default:
      step = <Submitter caller={this} options={this.state.options}/>;
    }

    return (
      <div className="container">
        <Row className="col-md-12">
          <form className='form-horizontal'>
            {step}
          </form>
        </Row>
      </div>
    );
  },
  stepCall: function(to, opts) {
    if (opts) {
      Object.keys(this.state.options).forEach(i => {
        if (opts[i] !== undefined)
          this.state.options[i] = opts[i];
      });
    }
    this.setState({
      step: to
    });
    if (to === 'Trace') {
      this.submitTrace(this.state.options);
    }
  },
  savePrefs: function(prefs) {
    console.log('savePrefs', prefs);
    socket.emit('savePreferences', prefs);
  }
});
