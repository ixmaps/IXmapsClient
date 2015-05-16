/* jslint node: true, esnext: true */

var React = require('react'), {Row, Panel} = require('react-bootstrap'), Graph = require('react-graph-vis');


var InputForm = require('./InputForm.jsx');

var Interface = React.createClass({
  render: function() {
    let {submitTrace, messages, graph} = this.props, output = '';
    console.log(JSON.stringify('m',graph, null, 2));
    if (this.state.textLog) {
      output = <div>{messages.map(m => <p>{m}</p>)}</div>;
    } else {
      output = <Graph identifier='x' style={{width:'100%', height:'20em'}} graph={graph} />;
      console.log('g', graph);
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
