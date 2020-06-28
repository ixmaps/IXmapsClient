/* jslint node: true, esnext: true */

var React = require('react'), {ControlLabel, FormControl, Button, Panel, Row, Col} = require('react-bootstrap'), createReactClass = require('create-react-class');

module.exports = createReactClass({
  fields : ['trset', 'dest'],
  render: function() {
    let {caller, trsets} = this.props, seltr;
    var canTrace = !!(this.state.dest || this.state.trset);

    if (trsets) {
      let tropts = trsets.map(t => <option key={t}>{t}</option>);
      seltr = (
        <div>
          <Row>
            <p>Select a batch of hostnames to target from among those listed here</p>
            <Col xsOffset={3} md={1}>
              <ControlLabel>TR Set</ControlLabel>
            </Col>
            <Col md={5}>
              <FormControl componentClass="select" placeholder="Use a predefined set of destinations" disabled={!!this.state.dest} onChange={this.changeDest} defaultValue={this.props.options.trset} inputRef={(ref) => this.trset = ref} label='TR Set' labelClassName='col-md-4' wrapperClassName='col-md-6'>
                <option value="">Select...</option>
                {tropts}
              </FormControl>
              <div>Learn what URLs are in these lists at our <a href='https://www.ixmaps.ca/trsets.php' target='_blank'>TRset page</a></div>
            </Col>
          </Row>
          <div style={{ 'textAlign': 'center', padding: '2.5em' }}><i>Or</i></div>
        </div>
      );
    }

    let trPlural = this.state.dest ? '' : 's';

    return (
      <div>
        <h1>Destination</h1>
        <Panel style={{padding: '2em'}} disabled>

          {seltr}

          <Row>
            <p>Enter a hostname of your own to target</p>
            <Col xsOffset={3} md={1}>
              <ControlLabel>Destination</ControlLabel>
            </Col>
            <Col md={5}>
              <FormControl disabled={!!this.state.trset} placeholder='Hostname (e.g. cbc.ca) or IP address (e.g. 123.123.123.123)' onChange={this.changeDest} inputRef={(ref) => {this.dest = ref}} type='text' defaultValue={this.props.options.dest} />
            </Col>
          </Row>
        </Panel>

        <Button bsStyle='primary' disabled={!canTrace} className="pull-right" onClick={this.use.bind(this, 'Trace')}>Generate Traceroute{trPlural}</Button>
        <Button className="pull-right" onClick={this.use.bind(this, 'Options')}>Options</Button>
        <Button className='pull-right' onClick={this.cancel}>Cancel</Button>
        <Button className="pull-right" onClick={this.goback}>Go back</Button>
      </div>
    );
  },
  changeDest: function() {
    this.setState({
      // dest: this.refs.dest.getValue(),
      // trset: this.refs.trset? this.refs.trset.getValue() : null
      dest: this.dest.value,
      trset: this.trset.value? this.trset.value : null
    });
  },
  use: function(next) {
    let options = {};
    ['trset', 'dest'].forEach(i => {
      // options[i] = this.refs[i] ? this.refs[i].getValue() : null;
      options[i] = this[i].value ? this[i].value : null;
    });

    this.props.caller.stepCall(next || 'Trace', options, this.fields);
  },
  getInitialState: function() {
    return {
      trset: this.props.options.trset,
      dest: this.props.options.dest
    };
  },
  cancel: function() {
    this.props.caller.stepCall('Finished', 'Destination');
  },
  goback: function() {
    this.props.caller.stepCall('Submitter');
  }
});
