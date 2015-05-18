/* jslint node: true, esnext: true */

var React = require('react'), {Row, Panel} = require('react-bootstrap');


var InputForm = require('./InputForm.jsx');

var Interface = React.createClass({
  render: function() {
    let {submitTrace, messages} = this.props, output = '';
    if (this.state.textLog) {
      output = <div>{messages.map(m => <p>{m}</p>)}</div>;
    }
    return (
      <Row>
        <Panel className="col-md-12">
          <InputForm submitTrace={submitTrace} />
        </Panel>
        <Panel className="col-md-12">
          <input id="textLog" type='checkbox' onChange={this.toggleLog} /> <label htmlFor="textLog">Text log</label>
          {output}
        </Panel>
      </Row>
    );
  },
  toggleLog: function(e) {
    this.setState({textLog: e.target.checked});
  },
  getInitialState: function() {
    return { textLog: false };
  }
});

module.exports = Interface;
