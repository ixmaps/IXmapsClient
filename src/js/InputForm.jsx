/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel, Row} = require('react-bootstrap'), _ = require('lodash');

var Submitter = require('./Submitter.jsx'), Destination = require('./Destination.jsx'), Options = require('./Options.jsx'), Trace = require('./Trace.jsx');

var defaultOptions = {
  submitter: '',
  postal_code: '',
  dest: '',
  trset: '',
  queries: 4,
  timeout: 1000,
  maxhops: 30,
  raw_protocol: 'ICMP',
  include_platform_traceroute: true,
  platform_protocol: 'Default',
  platform_limit_ms: 60000
};

module.exports = React.createClass({
  render: function() {
    let {trsets, messages} = this.props, step;

    switch(this.state.step) {
      case 'Destination':
        step = <Destination options={this.state.options} caller={this} trsets={trsets} />;
        break;
      case 'Options':
        step = <Options options={this.state.options} defaultOptions={defaultOptions} caller={this} />;
        break;
      case 'Trace':
        step = <Trace messages={messages} caller={this} />;
        break;
      default:
        step = <Submitter options={this.state.options} caller={this} />;
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
  submitTrace: function() {
    this.setState({step: 'Trace'});
    /*
    let options = { include_platform_traceroute: this.refs.include_platform_traceroute.getChecked() };
    ['trset', 'dest', 'queries', 'timeout', 'submitter', 'postal_code', 'maxhops', 'raw_protocol', 'platform_protocol', 'platform_limit_ms'].forEach(i => {
      options[i] = this.refs[i].getValue();
    });
    options.platform_limit_ms = options.platform_limit_ms * 1000;
    this.props.caller.submitTrace(options);
    */
  },
  stepCall: function(to, opts) {
    if (opts) {
      this.state.options = _.assign(this.state.options, opts);
    }
    this.setState({step: to});
  },
  cancelTrace: function() {
    this.setState({step: 'Destination'});
  },
  getInitialState: function() {
    return {
      options: _.clone(defaultOptions),
      step: 'Submitter'
    };
  }
});
