/* jslint node: true, esnext: true */

var React = require('react'), {ProgressBar, Button, Panel, Input} = require('react-bootstrap'), _ = require('lodash');

module.exports = React.createClass({
  render: function() {
    var {caller, messages, currentStatus, cancelTrace, toggleDebug} = this.props, progress, label = 'Close', action = _.partial(caller.stepCall.bind(this, 'Destination'));
    console.log('CC ' + currentStatus);
    if (currentStatus && currentStatus !== 'finished') {
      label = 'Cancel after current host';
      progress = <ProgressBar active now={100} label={currentStatus} />;
      action = cancelTrace;
    }
    return (
      <div>
        <h1>Executing traces</h1>
        {progress}

        <Button className="pull-right" onClick={action}>{label}</Button>
        <Input className="pull-right" id="debug" type="checkbox" onChange={toggleDebug} label="Full output" />

        <Panel>
          <h2>Ouput</h2>
          {messages.reverse().map(m => <p>{'[' + m.type + '@' + m.date + ']: ' + m.message}</p>)}
        </Panel>
      </div>
    );
  }
});
