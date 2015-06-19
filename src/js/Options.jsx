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
          <Input ref='queries' type='text' label='Queries' defaultValue={this.props.options.queries} labelClassName='col-md-4' wrapperClassName='col-md-1' />
          <Input ref='timeout' type='text' label='Timeout (milliseconds)' defaultValue={this.props.options.timeout} labelClassName='col-md-4' wrapperClassName='col-md-2' />
          <Input ref='maxhops' type='text' label='Maximum hops' defaultValue={this.props.options.maxhops} labelClassName='col-md-4' wrapperClassName='col-md-1' />
          <Input type="select" defaultValue={this.props.options.raw_protocol} ref="raw_protocol" label='Raw protocol' labelClassName='col-md-4' wrapperClassName='col-md-2'>
            {protocols}
          </Input>
        </Panel>
        <Panel>
          <Input ref="include_platform_traceroute" type='checkbox' defaultChecked={this.props.options.include_platform_traceroute} label='Include platform traceroute' wrapperClassName='col-md-offset-2 col-md-10' />
          <Input type="select" defaultValue={this.props.options.platform_protocol} ref="platform_protocol" label='Platform protocol' labelClassName='col-md-4' wrapperClassName='col-md-2'>
            <option>Default</option>
            {protocols}
          </Input>
          <Input ref='platform_limit_ms' type='text' label='Platform overall timeout (seconds)' defaultValue={this.props.options.platform_limit_ms / 1000} labelClassName='col-md-4' wrapperClassName='col-md-1' />
        </Panel>
        <Button className="pull-right" onClick={this.use}>Use these settings</Button>
        <Button className="pull-right" onClick={this.defaults}>Use defaults</Button>
        <Button className="pull-right" onClick={this.cancel}>Cancel</Button>
      </div>
    );
  },
  use: function() {
    let options = {
      include_platform_traceroute: this.refs.include_platform_traceroute.getChecked()
    };
    ['queries', 'timeout', 'maxhops', 'raw_protocol', 'platform_protocol', 'platform_limit_ms'].forEach(i => {
      options[i] = this.refs[i].getValue();
    });
    options.platform_limit_ms = options.platform_limit_ms * 1000;

    this.props.caller.stepCall('Destination', options);
  },
  defaults: function() {
    this.props.caller.stepCall('Destination', this.props.defaultOptions);
  },
  cancel: function() {
    this.props.caller.stepCall('Destination');
  }
});
