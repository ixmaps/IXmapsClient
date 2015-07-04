/* jslint node: true, esnext: true */

var React = require('react'), {ProgressBar, Button, Panel, Input} = require('react-bootstrap'), _ = require('lodash');

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

    let i = 0, output = [];
    sendMessages.forEach(m => {
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
        <Panel>
          <h1>Executing traces</h1>
          {progress}

          {action}
        </Panel>

        <Panel>
          <h2>Ouput</h2>
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
