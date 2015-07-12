/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    var {caller} = this.props, {submitter, postal_code} = this.state;
    return (
      <div>
        <h1>Submitter details</h1>
        <p>Welcome to the IXmaps traceroute generator - TRgen. This application will generate internet routings from your location and contribute to our database for later mapping and analysis. </p>
        <p>To get started, please provide your name, or pseudonym if you prefer, and the postalcode and/or city where you are located. These are not required, but will help you find your own traceroutes later, and in more accurately positioning the origin of the traceroutes you contribute.</p>
        <Panel>
          <Input ref='submitter' type='text' label='Your name' placeholder="Name or pseudonym (25 chars max)"
            onChange={this.change.bind(null, 'submitter')} value={submitter} labelClassName='col-md-4' wrapperClassName='col-md-4' />
          <Input ref='postal_code' type='text' label='Postal code or location' placeholder="Postalcode/location (25 chars max)"
            onChange={this.change.bind(null, 'postal_code')} value={postal_code} labelClassName='col-md-4' wrapperClassName='col-md-4' />
        </Panel>
        <Input ref='savePrefs' className='pull-right' type='checkbox' label='Store this information on your computer' />
        <Button className="pull-right" onClick={this.use}>Continue</Button>
      </div>
    );
  },
  change: function(field) {
    this.setState({[field]: this.refs[field].getValue()});
  },
  getInitialState: function() {
    return this.props.options;
  },
  componentWillReceiveProps(p) {
    this.setState(p.options);
  },
  use: function() {
    let options = {};
    ['submitter', 'postal_code'].forEach(i => {
      options[i] = this.refs[i].getValue();
    });

    if (this.refs.savePrefs.getChecked()) {
      this.props.caller.savePrefs({submitter: this.refs.submitter.getValue(), postal_code: this.refs.postal_code.getValue()});
    }

    this.props.caller.stepCall('Destination', options);
  }
});
