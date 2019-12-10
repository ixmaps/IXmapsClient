/* jslint node: true, esnext: true */

var React = require('react'), {Checkbox, Button, Panel} = require('react-bootstrap'),
    createReactClass = require('create-react-class');

module.exports = createReactClass({
  fields : ['submitter', 'city', 'postal_code', 'isp'],
  render: function() {
    var {caller} = this.props, {submitter, city, postal_code, isp, geoip} = this.state;

    return (
      <div>
        <h2>Welcome to the IXmaps traceroute generator</h2>
        <p>This application will generate internet routings from your location to various web destinations and contribute them to our database for later mapping and analysis. As indicated in our <a href='https://www.ixmaps.ca/privacy.php' target='_blank'>privacy policy</a>, we do not store any personal information of contributors. </p>
        <p>To get started, please provide your name, or pseudonym if you prefer. This is not required, but will help you find your own traceroutes later:
        <input type='text' placeholder='Name or pseudonym (25 chars max)' onChange={this.change.bind(null, 'submitter')} value={submitter} className='input submitter' /></p>
        <p>You appear to be near
        <input type='text' placeholder='city' onChange={this.change.bind(null, 'city')} value={city} className='input city' />
        <input type='text' placeholder='postal_code' onChange={this.change.bind(null, 'postal_code')} value={postal_code} className='input postal_code' /> <br />
        with
        <input type='text' placeholder='Internet Service Provider' onChange={this.change.bind(null, 'isp')} value={isp} className='input isp' />
        as your internet service provider (ISP).</p>
        <p>Please correct these if appropriate. This too is optional, but will assist in more accurately positioning the origin of the traceroutes you contribute.</p>
        
        <Checkbox inputRef={(ref) => this.savePrefs = ref} className='text-right' defaultChecked inline>Store this information on your computer</Checkbox>
        <Button bsStyle='primary' className='pull-right' onClick={this.use}>Continue</Button>
        <Button className='pull-right' onClick={this.cancel}>Cancel</Button>
      </div>
    );
  },
  change: function(field, e) {
    this.setState({[field]: e.target.value});
  },
  getInitialState: function() {
    return this.optionsWithGeoip(this.props.options, this.props.geoip);
  },
  componentWillReceiveProps(p) {
    this.setState(this.optionsWithGeoip(p.options, p.geoip));
  },
  use: function() {
    let options = {};
    this.fields.forEach(i => {
      options[i] = this.state[i];
    });

    // if (this.refs.savePrefs.getChecked()) {
    if (this.savePrefs.checked) {
      this.props.caller.savePrefs(options);
    }

    this.props.caller.stepCall('Destination', options, this.fields);
  },
  cancel: function() {
    this.props.caller.stepCall('Finished', 'Submitter');
  },
  optionsWithGeoip: function(options) {
    let geoip = options.geoip || {};
    return {
      submitter: options.submitter,
      city: options.city || geoip.city,
      postal_code: options.postal_code || geoip.postal_code,
      isp: options.isp || geoip.isp
    }
  }
});
