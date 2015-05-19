/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel, Row} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Trace parameters</h1>
        <form className='form-horizontal'>
          <Input ref='dest' type='text' label='Destination' defaultValue='ixmaps.ca' labelClassName='col-md-4' wrapperClassName='col-md-6' />
          <Input ref='postal_code' type='text' label='Postal code' defaultValue='m1m' labelClassName='col-md-4' wrapperClassName='col-md-2' />
          <Input ref='queries' type='text' label='Queries' defaultValue='4' labelClassName='col-md-4' wrapperClassName='col-md-1' />
          <Input ref='timeout' type='text' label='Timeout (milliseconds)' defaultValue='1000' labelClassName='col-md-4' wrapperClassName='col-md-2' />
          <Input ref='maxhops' type='text' label='Maximum hops' defaultValue='30' labelClassName='col-md-4' wrapperClassName='col-md-1' />
          <Input ref="include_platform_traceroute" type='checkbox' defaultChecked={true} label='Include platform traceroute' wrapperClassName='col-xs-offset-2 col-xs-10' />
          <Button className="pull-right" onClick={this.submitTrace}>Submit Trace</Button>
        </form>
      </div>
    );
  },
  submitTrace: function() {
    let options = { include_platform_traceroute: this.refs.include_platform_traceroute.getChecked() };
    ['dest', 'queries', 'timeout', 'postal_code', 'maxhops'].forEach(i => {
      options[i] = this.refs[i].getValue();
    });
    console.log('totaly submitting');
    this.props.submitTrace(options);
  }
});
