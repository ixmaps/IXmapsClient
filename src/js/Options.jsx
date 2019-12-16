/* jslint node: true, esnext: true */

var React = require('react'), {Form, FormGroup, Col, ControlLabel, FormControl, Button, Panel, Alert, Checkbox, Row} = require('react-bootstrap'), createReactClass = require('create-react-class');

module.exports = createReactClass({
  fields: ['queries', 'timeout', 'maxhops', 'raw_protocol', 'max_sequential_errors', 'include_platform_traceroute', 'platform_protocol', 'platform_limit_ms'],
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
          <Alert bsStyle='warning'>
            <p>
              These options modify the behaviour of the traceroute generator.
              It assumes familiarity with <a href='https://www.ixmaps.ca/learn/faq.php' target='_blank'>traceroute techniques</a>.
              Increasing any of the values or selecting 'Include platform traceroute' may substantially increase the length of time to complete each traceroute submission.
            </p>
          </Alert>

          <Form horizontal>
            <FormGroup controlId="formOptions">
              <Row>
                <Col componentClass={ControlLabel} md={4}>
                  Passes
                </Col>
                <Col md={8}>
                  <FormControl type='text' inputRef={(ref) => {this.queries = ref}} defaultValue={this.props.options.queries} style={{width: '4.2em'}} />
                  <div class="help-text">The number of times each router on the route to the destination is probed</div>
                </Col>
              </Row>
              <Row style={{marginTop: '25px'}}>
                <Col componentClass={ControlLabel} md={4}>
                  Timeout (milliseconds)
                </Col>
                <Col md={8}>
                  <FormControl type='text' inputRef={(ref) => {this.timeout = ref}} defaultValue={this.props.options.timeout} style={{width: '4.2em'}} />
                  <div class="help-text">The maximum time the traceroute generator will wait for a response from a particular router</div>
                </Col>
              </Row>
              <Row style={{marginTop: '25px'}}>
                <Col componentClass={ControlLabel} md={4}>
                  Maximum hops
                </Col>
                <Col md={8}>
                  <FormControl type='text' inputRef={(ref) => {this.maxhops = ref}} defaultValue={this.props.options.maxhops} style={{width: '4.2em'}} />
                  <div class="help-text">Limit to number of router hops - i.e. maximum time to live (TTL) of a probe</div>
                </Col>
              </Row>
              <Row style={{marginTop: '25px'}}>
                <Col componentClass={ControlLabel} md={4}>
                  Maximum sequential errors
                </Col>
                <Col md={8}>
                  <FormControl type='text' inputRef={(ref) => {this.max_sequential_errors = ref}} defaultValue={this.props.options.max_sequential_errors} style={{width: '4.2em'}} />
                  <div class="help-text">Number of timeouts or errors in a row (i.e. successive TTLs) before stopping trace</div>
                </Col>
              </Row>
              <Row style={{marginTop: '25px'}}>
                <Col componentClass={ControlLabel} md={4}>
                  Raw protocol
                </Col>
                <Col md={2}>
                  <FormControl componentClass="select" defaultValue={this.props.options.raw_protocol} inputRef={(ref) => this.raw_protocol = ref}>
                    {protocols}
                  </FormControl>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Panel>
        <Panel>
          <Form horizontal>
            <FormGroup controlId="formOptions">
              <Row style={{marginTop: '10px'}}>
                <Col xsOffset={4} md={8}>
                  <Checkbox inputRef={(ref) => this.include_platform_traceroute = ref} inline>Include platform traceroute</Checkbox>
                  <div class="help-text">Include output of the platform's native traceroute program</div>
                </Col>
              </Row>
              <Row style={{marginTop: '25px'}}>
                <Col componentClass={ControlLabel} md={4}>
                  Platform protocol
                </Col>
                <Col md={2}>
                  <FormControl componentClass="select" defaultValue={this.props.options.platform_protocol} inputRef={(ref) => this.platform_protocol = ref}>
                    <option>Default</option>
                    {protocols}
                  </FormControl>
                </Col>
              </Row>
              <Row style={{marginTop: '25px'}}>
                <Col componentClass={ControlLabel} md={4}>
                  Platform overall timeout (seconds)
                </Col>
                <Col md={8}>
                  <FormControl type='text' inputRef={(ref) => {this.platform_limit_ms = ref}} defaultValue={this.props.options.platform_limit_ms / 1000} style={{width: '4.2em'}} />
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Panel>
        <Button bsStyle='primary' className="pull-right" onClick={this.use}>Use these settings</Button>
        <Button className="pull-right" onClick={this.defaults}>Use defaults</Button>
        <Button className="pull-right" onClick={this.cancel}>Cancel</Button>
        <br />
      </div>
    );
  },
  use: function() {
    let options = {};
    this.fields.forEach(i => options[i] = this[i].value);
    options.platform_limit_ms = options.platform_limit_ms * 1000;
    options.include_platform_traceroute = this.include_platform_traceroute.checked;
    this.props.caller.stepCall('Destination', options, this.fields);
  },
  defaults: function() {
    this.props.caller.stepCall('Destination', this.props.defaultOptions, this.fields);
  },
  cancel: function() {
    this.props.caller.stepCall('Destination');
  }
});
