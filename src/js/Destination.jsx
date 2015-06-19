/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel, Row} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    let {caller, trsets} = this.props, seltr;

console.log('C ' + this.state.canTrace);
    if (trsets) {
      let tropts = trsets.map(t => <option key={t}>{t}</option>);
      seltr = (
        <Input onChange={this.changeDest} type="select" defaultValue={this.props.options.trset} ref="trset" label='TR Set' labelClassName='col-md-4' wrapperClassName='col-md-6' help="Use a predefined set of destinations">
          <option value="">Enter below</option>
          {tropts}
        </Input>
      );
    }

    return (
      <div>
        <h1>Destination</h1>
        <Panel disabled>
          {seltr}
          <div style={{'text-align': 'center', padding: '1em' }}><i>Or</i></div>
          <Input onChange={this.changeDest} ref='dest' type='text' label='Destination' defaultValue={this.props.options.dest} labelClassName='col-md-4' wrapperClassName='col-md-6' />
        </Panel>
        <Button disabled={!this.state.canTrace} className="pull-right" onClick={this.use.bind(this, 'Trace')}>Submit Trace</Button>
        <Button className="pull-right" onClick={this.use.bind(this, 'Options')}>Options</Button>
        <Button className="pull-right" onClick={this.cancel}>Go back</Button>
      </div>
    );
  },
  changeDest: function() {
    this.setState({
      canTrace : !!(this.refs.dest.getValue() || this.refs.trset.getValue())
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
      canTrace: !!(this.props.dest || this.props.trset)
    };
  }
});
