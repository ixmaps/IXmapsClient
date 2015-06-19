/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    var {caller} = this.props;
    return (
      <div>
        <h1>Submitter details</h1>
        <Panel>
          <Input ref='submitter' type='text' label='Your name' defaultValue={this.props.options.submitter} labelClassName='col-md-4' wrapperClassName='col-md-2' />
          <Input ref='postal_code' type='text' label='Postal code or location' defaultValue={this.props.options.postal_code} labelClassName='col-md-4' wrapperClassName='col-md-2' />
        </Panel>
        <Button className="pull-right" onClick={this.use}>Continue</Button>
      </div>
    );
  },
  use: function() {
    let options = {};
    ['submitter', 'postal_code'].forEach(i => {
      options[i] = this.refs[i].getValue();
    });

    this.props.caller.stepCall('Destination', options);
  }
});
