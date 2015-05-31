/* jslint node: true, esnext: true */

var React = require('react'), {Row, Panel} = require('react-bootstrap');


var InputForm = require('./InputForm.jsx');

var Interface = React.createClass({
  render: function() {
    let {caller, messages} = this.props;
    return (
      <Row>
        <Panel className="col-md-12">
          <InputForm caller={caller} />
        </Panel>
        <Panel className="col-md-12">
          <input id="debug" type="checkbox" onClick={caller.toggleDebug} /> <label htmlFor="debug">Full output</label>
          <div>{messages.map(m => <p>{m.type + ': ' + m.message}</p>)}</div>
        </Panel>
      </Row>
    );
  }
});

module.exports = Interface;
