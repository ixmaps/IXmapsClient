/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    var {caller} = this.props;
    return (
      <div>
        <h1>Submitter details</h1>
        <p>Welcome to the IXmaps traceroute generator - TRgen. This application will generate internet routings from your location and contribute to our database for later mapping and analysis. </p>
        <p>To get started, please provide your name, or pseudonym if you prefer, and the postalcode and/or city where you are located. These are not required, but will help you find your own traceroutes later, and in more accurately positioning the origin of the traceroutes you contribute.</p>
        <Panel>
          <Input ref='submitter' type='text' label='Your name' placeholder="Name or pseudonym (25 chars max)" defaultValue={this.props.options.submitter} labelClassName='col-md-4' wrapperClassName='col-md-4' />
          <Input ref='postal_code' type='text' label='Postal code or location' placeholder="Postalcode/location (25 chars max)" defaultValue={this.props.options.postal_code} labelClassName='col-md-4' wrapperClassName='col-md-4' />
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
