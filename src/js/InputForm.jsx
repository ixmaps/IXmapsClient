/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    return (
      <Panel>
        <h1>Trace parameters</h1>
        <form className='form-horizontal'>
          <Input ref="host" type='text' label='Host' labelClassName='col-xs-2' wrapperClassName='col-xs-7' />
          <Input ref="postal_code" type='text' label='Postal code' labelClassName='col-xs-2' wrapperClassName='col-xs-2' />
          <Input ref="queries" type='text' label='Queries' defaultValue='4' labelClassName='col-xs-2' wrapperClassName='col-xs-2' />
          <Input ref="timeout" type='text' label='Timeout (milliseconds)' defaultValue='1000' labelClassName='col-xs-2' wrapperClassName='col-xs-2' />
          <Input ref="max_hops" type='text' label='Maximum hops' defaultValue='30' labelClassName='col-xs-2' wrapperClassName='col-xs-2' />
          <Input ref="include_platform_traceroute" type='checkbox' label='Include platform traceroute' wrapperClassName='col-xs-offset-2 col-xs-10' help='Include the output of your operating systems traceroute program.' />
          <Button className='pull-right' onClick={this.submitTrace}>Submit Trace</Button>
        </form>
      </Panel>
    );
  },
  submitTrace: function() {
    let options = { include_platform_traceroute: this.refs.include_platform_traceroute.getChecked() };
    ['host', 'queries', 'timeout', 'postal_code', 'max_hops'].forEach(i => {
      options[i] = this.refs[i].getValue();
    });
    this.props.submitTrace(options);
  }
});
