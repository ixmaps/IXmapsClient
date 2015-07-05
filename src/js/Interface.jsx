/* jslint node: true, esnext: true, browser: true */

var React = require('react'), { Row, Alert } = require('react-bootstrap'), _ = require('lodash'), io = require('socket.io-client');

var Submitter = require('./Submitter.jsx'),
  Destination = require('./Destination.jsx'),
  Options = require('./Options.jsx'),
  Trace = require('./Trace.jsx');

var defaultOptions = {
  submitter: '',
  postal_code: '',
  dest: '',
  trset: '',
  queries: 4,
  timeout: 750,
  maxhops: 24,
  raw_protocol: 'ICMP',
  max_sequential_errors: 3,
  include_platform_traceroute: false,
  platform_protocol: 'Default',
  platform_limit_ms: 60000
};

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
  trsets: function(t) {
    this.setState(_.assign({}, this.state, {
      trsets: t
    }));
  },
  disconnected: function() {
    console.log('disconnect');
  },
  update: function(incoming) {
    let { type, message, content } = incoming, messages = _.clone(this.state.messages);
    console.log('update', incoming);
    if (type === 'STATUS') {
      this.state.currentStatus = message;
    } else {
      messages.push({ date: new Date(), type, message, content });
    }
    this.setState(_.assign({}, this.state, {messages}));
  },
  submitTrace: function(options) {
    this.state.currentStatus = null;
    window.s = socket;
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

    let gen = new Date().getTime();
    this.state.ackInterval = setInterval(() => socket.emit('pong', gen, this.state.ack), 500);
  },
  getInitialState: function() {
    return {
      messages: [],
      options: _.clone(defaultOptions),
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
      step = <Options caller={this} defaultOptions={defaultOptions} options={this.state.options}/>;
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
  }
});
