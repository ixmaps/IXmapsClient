/* jslint node: true, esnext: true */

var React = require('react'), {ProgressBar, Button, Panel, Input} = require('react-bootstrap'), _ = require('lodash');

module.exports = React.createClass({
  render: function() {
    var {caller, messages, currentStatus, cancelTrace, toggleDebug} = this.props, progress, label = 'Close', action = this.finished;
    if (currentStatus && currentStatus !== 'finished') {
      label = 'Cancel after current host';
      progress = <ProgressBar active now={100} label={currentStatus} />;
      action = cancelTrace;
    }
    let i = 0, output = [];
    messages.forEach(m => {
      if (true) {
        output.unshift(<p key={i++}>{'[' + m.type + '@' + m.date + ']: ' + m.message}</p>);
      } else if (m.content.err) {
        output.unshift(<p style={{fontColor: 'red'}} key={i++}>{m.content.options.dest} ({m.content.options.dest_ip}) had an error: {m.content.err}</p>);
      } else {
        output.unshift(<a href={'https://www.ixmaps.ca/explore.php?trid=' + m.content.trid} key={i++}>{m.message}</a>);
        //output.unshift(<p key={i++}>{'[' + m.type + '@' + m.date + ']: ' + m.message}</p>);
      }
    });
    return (
      <div>
        <h1>Executing traces</h1>
        {progress}

        <Button className="pull-right" onClick={action}>{label}</Button>
        <Input className="pull-right" id="debug" type="checkbox" onChange={toggleDebug} label="Full output" />

        <Panel>
          <h2>Ouput</h2>
          {output}
        </Panel>
      </div>
    );
  },
  visit: function(e) {
    e.preventDefault();
    if (e.target.tagName == 'A')
    require('shell').openExternal(e.target.href);
    return false;
  },
  finished: function() {
    this.props.caller.stepCall('Destination');
  }
});
