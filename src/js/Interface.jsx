/* jslint node: true, esnext: true */

var React = require('react'), {Row, Panel} = require('react-bootstrap');


var InputForm = require('./InputForm.jsx');

var Interface = React.createClass({
  render: function() {
    let {submitTrace, messages} = this.props;
    return (
      <Row>
        <Panel className="col-md-12">
          <InputForm submitTrace={submitTrace} />
        </Panel>
        <Panel className="col-md-12">
          <div>{messages.map(m => <p>{m}</p>)}</div>
        </Panel>
      </Row>
    );
  }
});

module.exports = Interface;
