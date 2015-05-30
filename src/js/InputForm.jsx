/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel, Row} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    var protocols = [
      <option>ICMP</option>,
      <option>UDP</option>,
      <option>TCP</option>
    ];

    return (
      <div>
        <h1>Trace parameters</h1>
        <form className='form-horizontal'>
          <Panel>
            <Input ref='dest' type='text' label='Destination' defaultValue='ixmaps.ca' labelClassName='col-md-4' wrapperClassName='col-md-6' />
            <Input ref='submitter' type='text' label='Your name' defaultValue='' labelClassName='col-md-4' wrapperClassName='col-md-2' />
            <Input ref='postal_code' type='text' label='Postal code' defaultValue='m1m' labelClassName='col-md-4' wrapperClassName='col-md-2' />
            <Input ref='queries' type='text' label='Queries' defaultValue='4' labelClassName='col-md-4' wrapperClassName='col-md-1' />
            <Input ref='timeout' type='text' label='Timeout (milliseconds)' defaultValue='1000' labelClassName='col-md-4' wrapperClassName='col-md-2' />
            <Input ref='maxhops' type='text' label='Maximum hops' defaultValue='30' labelClassName='col-md-4' wrapperClassName='col-md-1' />
            <Input type="select" value="ICMP" ref="raw_protocol" label='Raw protocol' labelClassName='col-md-4' wrapperClassName='col-xs-2'>
              {protocols}
            </Input>
          </Panel>
          <Panel>
            <Input ref="include_platform_traceroute" type='checkbox' defaultChecked={true} label='Include platform traceroute' wrapperClassName='col-xs-offset-2 col-xs-10' />
            <Input type="select" value="UDP" ref="platform_protocol" label='Platform protocol' labelClassName='col-md-4' wrapperClassName='col-xs-2'>
              {protocols}
            </Input>
          </Panel>
          <Button className="pull-right" onClick={this.submitTrace}>Submit Trace</Button>
        </form>
      </div>
    );
  },
  submitTrace: function() {
    let options = { include_platform_traceroute: this.refs.include_platform_traceroute.getChecked() };
    ['dest', 'queries', 'timeout', 'submitter', 'postal_code', 'maxhops', 'raw_protocol', 'platform_protocol'].forEach(i => {
      options[i] = this.refs[i].getValue();
    });
    this.props.submitTrace(options);
  }
});
