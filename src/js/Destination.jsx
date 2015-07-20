/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel, Row} = require('react-bootstrap');


module.exports = React.createClass({
  fields : ['trset', 'dest'],
  render: function() {
    let {caller, trsets} = this.props, seltr;
    var canTrace = !!(this.state.dest || this.state.trset);

    if (trsets) {
      let tropts = trsets.map(t => <option key={t}>{t}</option>);
      seltr = (
        <div>
          <p>Select a batch of hostnames to target from among those listed here:</p>

          <Input disabled={!!this.state.dest} onChange={this.changeDest} type="select" defaultValue={this.props.options.trset} ref="trset" label='TR Set' labelClassName='col-md-4' wrapperClassName='col-md-6' help="Use a predefined set of destinations">
            <option value="">Enter below</option>
            {tropts}
          </Input>
          <div style={{'textAlign': 'center', padding: '1em' }}><i>Or</i></div>
        </div>
      );
    }

    let trPlural = this.state.dest ? '' : 's';

    return (
      <div>
        <h1>Destination</h1>
        <Panel disabled>
          {seltr}
          <p>Enter a hostname of your own to target</p>
          <Input disabled={!!this.state.trset} placeholder='Hostname (e.g. cbc.ca) or IP address (e.g. 123.123.123.123)' onChange={this.changeDest} ref='dest' type='text' label='Destination' defaultValue={this.props.options.dest} labelClassName='col-md-4' wrapperClassName='col-md-6' />
        </Panel>
        <Button bsStyle='primary' disabled={!canTrace} className="pull-right" onClick={this.use.bind(this, 'Trace')}>Generate Traceroute{trPlural}</Button>
        <Button className="pull-right" onClick={this.use.bind(this, 'Options')}>Options</Button>
        <Button className='pull-right' onClick={this.cancel}>Cancel</Button>
        <Button className="pull-right" onClick={this.goback}>Go back</Button>
      </div>
    );
  },
  changeDest: function() {
    this.setState({
      dest: this.refs.dest.getValue(),
      trset: this.refs.trset? this.refs.trset.getValue() : null
    });
  },
  use: function(next) {
    let options = {};
    ['trset', 'dest'].forEach(i => {
      options[i] = this.refs[i] ? this.refs[i].getValue() : null;
    });

    this.props.caller.stepCall(next || 'Trace', options, this.fields);
  },
  getInitialState: function() {
    return {
      trset: this.props.options.trset,
      dest: this.props.options.dest
    };
  },
  cancel: function() {
    this.props.caller.stepCall('Finished', 'Destination');
  },
  goback: function() {
    this.props.caller.stepCall('Submitter');
  }
});
