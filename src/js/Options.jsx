/* jslint node: true, esnext: true */

var React = require('react'), {Input, Button, Panel, Row} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    var {caller} = this.props, protocols = [
        <option key="ICMP">ICMP</option>,
        <option key="UDP">UDP</option>,
        <option key="TCP">TCP</option>
      ];
    return (
      <div>
        <h1>Options</h1>
        <Panel>
          <Input ref='queries' type='text' label='Queries' defaultValue='4' labelClassName='col-md-4' wrapperClassName='col-md-1' />
          <Input ref='timeout' type='text' label='Timeout (milliseconds)' defaultValue='1000' labelClassName='col-md-4' wrapperClassName='col-md-2' />
          <Input ref='maxhops' type='text' label='Maximum hops' defaultValue='30' labelClassName='col-md-4' wrapperClassName='col-md-1' />
          <Input type="select" defaultValue="ICMP" ref="raw_protocol" label='Raw protocol' labelClassName='col-md-4' wrapperClassName='col-md-2'>
            {protocols}
          </Input>
        </Panel>
        <Panel>
          <Input ref="include_platform_traceroute" type='checkbox' defaultChecked={true} label='Include platform traceroute' wrapperClassName='col-md-offset-2 col-md-10' />
          <Input type="select" defaultValue="" ref="platform_protocol" label='Platform protocol' labelClassName='col-md-4' wrapperClassName='col-md-2'>
            <option>Default</option>
            {protocols}
          </Input>
          <Input ref='platform_limit_ms' type='text' label='Platform overall timeout (seconds)' defaultValue='120' labelClassName='col-md-4' wrapperClassName='col-md-1' />
        </Panel>
        <Button className="pull-right" onClick={caller.destination}>Use these settings</Button>
        <Button className="pull-right" onClick={caller.destination}>Cancel</Button>
      </div>
    );
  }
});
