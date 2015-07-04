/* jslint node: true, esnext: true */

var React = require('react'), { Row } = require('react-bootstrap'), _ = require('lodash'), io = require('socket.io-client');

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
    socket.on('disconnect', this.disconnected);
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
