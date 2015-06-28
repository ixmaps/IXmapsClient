/* jslint node: true, esnext: true */

var React = require('react'), {ProgressBar, Button, Panel, Input} = require('react-bootstrap'), _ = require('lodash');

module.exports = React.createClass({
  render: function() {
    var {caller, messages, currentStatus, cancelTrace, toggleDebug} = this.props, progress,
      action = <Button className="pull-right" onClick={this.finished}>Close</Button>;
    if (currentStatus && currentStatus !== 'finished') {
      action = <Button className="pull-right" onClick={cancelTrace}>Cancel after current trace</Button>;
      progress = <ProgressBar active now={100} label={currentStatus} />;
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
        <Panel>
          <h1>Executing traces</h1>
          {progress}

          {action}
        </Panel>

        <Panel>
          <h2>Ouput</h2>
          <Input className="pull-right" id="debug" type="checkbox" onChange={toggleDebug} label="Detailed output" />
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
