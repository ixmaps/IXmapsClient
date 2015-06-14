/* jslint node: true, esnext: true */

var React = require('react'), {Row, Panel} = require('react-bootstrap');


var InputForm = require('./InputForm.jsx');

var Interface = React.createClass({
  render: function() {
    let {caller, messages, trsets} = this.props;
    return (
      <Row>
        <Panel className="col-md-12">
          <InputForm caller={caller} trsets={trsets} messages={messages} />
        </Panel>
      </Row>
    );
  }
});

module.exports = Interface;
