/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel, Row} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    let {caller, trsets} = this.props, seltr;

    if (trsets) {
      let tropts = trsets.map(t => <option key={t}>{t}</option>);
      seltr = (
        <Input type="select" defaultValue="" ref="trset" label='TR Set' labelClassName='col-md-4' wrapperClassName='col-md-6' help="Use a predefined set of destinations">
          <option value="">Enter below</option>
          {tropts}
        </Input>
      );
    }
    return (
      <div>
        <h1>Destination</h1>
        <Panel>
          {seltr}
          <div style={{'text-align': 'center', padding: '1em' }}><i>Or</i></div>
          <Input ref='dest' type='text' label='Destination' defaultValue='' labelClassName='col-md-4' wrapperClassName='col-md-6' />
        </Panel>
        <Button className="pull-right" onClick={caller.submitTrace}>Submit Trace</Button>
        <Button className="pull-right" onClick={caller.options}>Options</Button>
        <Button className="pull-right" onClick={caller.submitter}>Go back</Button>
      </div>
    );
  }
});
