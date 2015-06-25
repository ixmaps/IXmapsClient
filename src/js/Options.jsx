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
          <Input ref='queries' type='text' label='Queries' help="The number of sets of hops" defaultValue={this.props.options.queries}
            style={{width: '3em'}} labelClassName='col-md-4' wrapperClassName='col-md-8' />
          <Input ref='timeout' type='text' label='Timeout (milliseconds)' help="Maximum time to live of a hop probe" defaultValue={this.props.options.timeout}
            style={{width: '5em'}} labelClassName='col-md-4' wrapperClassName='col-md-8' />
          <Input ref='maxhops' type='text' label='Maximum hops' help="Limit of router hops" defaultValue={this.props.options.maxhops}
            style={{width: '4em'}} labelClassName='col-md-4' wrapperClassName='col-md-8' />
          <Input ref='max_sequential_errors' type='text' help="Number of timeouts or errors in a row before stopping query"
            style={{width: '4em'}} label='Maximum sequential errors' defaultValue={this.props.options.max_sequential_errors} labelClassName='col-md-4' wrapperClassName='col-md-8' />
          <Input type="select" defaultValue={this.props.options.raw_protocol} ref="raw_protocol" label='Raw protocol'
            labelClassName='col-md-4' wrapperClassName='col-md-2'>
            {protocols}
          </Input>
        </Panel>
        <Panel>
          <Input ref="include_platform_traceroute" type='checkbox' help="Include output of the platform's native traceroute program" defaultChecked={this.props.options.include_platform_traceroute} label='Include platform traceroute'
            wrapperClassName='col-md-offset-2 col-md-8' />
          <Input type="select" defaultValue={this.props.options.platform_protocol} ref="platform_protocol" label='Platform protocol'
            labelClassName='col-md-4' wrapperClassName='col-md-2'>
            <option>Default</option>
            {protocols}
          </Input>
          <Input ref='platform_limit_ms' type='text' label='Platform overall timeout (seconds)' defaultValue={this.props.options.platform_limit_ms / 1000}
            labelClassName='col-md-4' wrapperClassName='col-md-1' />
        </Panel>
        <Button className="pull-right" onClick={this.use}>Use these settings</Button>
        <Button className="pull-right" onClick={this.defaults}>Use defaults</Button>
        <Button className="pull-right" onClick={this.cancel}>Cancel</Button>
        <br />
      </div>
    );
  },
  use: function() {
    let options = {
      include_platform_traceroute: this.refs.include_platform_traceroute.getChecked()
    };
    ['queries', 'timeout', 'maxhops', 'raw_protocol', 'max_sequential_errors', 'platform_protocol', 'platform_limit_ms'].forEach(i => {
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
