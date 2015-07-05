/* jslint node: true, esnext: true */

var React = require('react'), {ProgressBar, Button, Panel, Input, Glyphicon} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    let {caller, messages, currentStatus} = this.props, progress, sendMessages = [],
      action = <Button className="pull-right" onClick={this.finished}>Close</Button>;
    if (currentStatus && currentStatus !== 'finished') {
      action = <Button className="pull-right" onClick={caller.cancelTrace}>Cancel after current trace</Button>;
      progress = <ProgressBar active now={100} label={currentStatus} />;
    }
    for (let i = 0; i < messages.length; i++) {
      var m = messages[i];
      if (this.state.debug || m.type === 'submitted' || i == messages.length - 1) {
        sendMessages.push(m);
      }
    }

    let i = 0, output = [], display, info;
    sendMessages.forEach(m => {
      info = `[${m.type}@${m.date}]`;
      if (m.type === 'submitted') {
        display = <a target="trid" href={'https://www.ixmaps.ca/explore.php?trid=' + m.content.trid}><Glyphicon glyph='link' /> {m.message}</a>;
      } else if (m.content && m.content.err) {
        display = <span style={{color: 'red'}}>{m.message}</span>;
      } else {
        display = m.message;
      }

      output.unshift(<p key={i++}>{info} {display}</p>);
    });
    return (
      <div>
        <Panel>
          <h1>Executing traces</h1>
          {progress}

          {action}
        </Panel>

        <Panel>
          <h2>Output</h2>
          <Input className="pull-right" id="debug" type="checkbox" onChange={this.toggleDebug} label="Detailed output" />
          {output}
        </Panel>
      </div>
    );
  },
  getInitialState: function() {
    return {
      debug: false
    };
  },
  toggleDebug: function(e) {
    this.setState({debug: e.target.checked});
  },
  finished: function() {
    this.props.caller.stepCall('Destination');
  }
});
