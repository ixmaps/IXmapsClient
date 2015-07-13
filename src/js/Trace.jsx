/* jslint node: true, esnext: true */

var React = require('react'), {ProgressBar, Button, Panel, Input, Glyphicon, Label, Table} = require('react-bootstrap'),
  moment = require('moment');

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
      if (this.state.debug || m.type === 'submitted' || m.type === 'error' || i == messages.length - 1) {
        sendMessages.push(m);
      }
    }

    let i = 0, output = [], display, ltype, date;
    sendMessages.forEach(m => {
      if (m.type === 'submitted') {
        display = <a target="trid" href={'https://www.ixmaps.ca/explore.php?trid=' + m.content.trid}><Glyphicon glyph='link' /> {m.message}</a>;
        ltype = 'success';
      } else if (m.type === 'error') {
        display = <span style={{color: 'red'}}>{m.message}</span>;
        ltype = 'danger';
      } else {
        display = m.message;
        ltype = 'info';
      }
      date = moment(m.date).format('YYYY-MM-DD HH:m:s');

      output.unshift(
        <tr key={i++}>
          <td><Label className='pull-right' bsStyle={ltype}>{m.type}</Label></td>
          <td><div style={{textAlign: 'center'}}>{date}</div></td>
          <td>{display}</td>
        </tr>);
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
          <Table>
            <tbody>
              {output}
            </tbody>
          </Table>
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
