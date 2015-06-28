/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel, Row} = require('react-bootstrap');

module.exports = React.createClass({
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

    return (
      <div>
        <h1>Destination</h1>
        <Panel disabled>
          {seltr}
          <p>Enter a hostname of your own to target</p>
          <Input disabled={!!this.state.trset} onChange={this.changeDest} ref='dest' type='text' label='Destination' defaultValue={this.props.options.dest} labelClassName='col-md-4' wrapperClassName='col-md-6' />
        </Panel>
        <Button disabled={!canTrace} className="pull-right" onClick={this.use.bind(this, 'Trace')}>Submit Trace</Button>
        <Button className="pull-right" onClick={this.use.bind(this, 'Options')}>Options</Button>
        <Button className="pull-right" onClick={this.cancel}>Go back</Button>
      </div>
    );
  },
  changeDest: function() {
    this.setState({
      dest: this.refs.dest.getValue(),
      trset: this.refs.trset.getValue()
    });
  },
  use: function(next) {
    let options = {};
    ['trset', 'dest'].forEach(i => {
      options[i] = this.refs[i].getValue();
    });

    this.props.caller.stepCall(next || 'Trace', options);
  },
  cancel: function() {
    this.props.caller.stepCall('Submitter');
  },
  getInitialState: function() {
    return {
      trset: this.props.options.trset,
      dest: this.props.options.dest
    };
  }
});
