/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel, Row} = require('react-bootstrap');

var Submitter = require('./Submitter.jsx'), Destination = require('./Destination.jsx'), Options = require('./Options.jsx'), Trace = require('./Trace.jsx');

module.exports = React.createClass({
  render: function() {
    let {trsets, messages} = this.props, step;
    console.log('guide'+ this.state.step);

    switch(this.state.step) {
      case 'Destination':
        step = <Destination caller={this} trsets={trsets} />;
        break;
      case 'Options':
        step = <Options caller={this} />;
        break;
      case 'Trace':
        step = <Trace messages={messages} caller={this} />;
        break;
      default:
        step = <Submitter caller={this} />;
    }

    return (
      <form className='form-horizontal'>
        {step}
      </form>
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
  cancelTrace: function() {
    this.setState({step: 'Destination'});
  },
  destination: function() {
    this.setState({step : 'Destination'});
  },
  options: function() {
    this.setState({step : 'Options'});
  },
  submitter: function() {
    this.setState({step : 'Submitter'});
  },
  getInitialState: function() {
    return {
      step: 'Submitter'
    };
  }
});
