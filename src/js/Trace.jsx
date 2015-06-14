/* jslint node: true, esnext: true */

var React = require('react'), {ProgressBar, Button, Panel} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    var {caller, messages} = this.props;
    return (
      <div>
        <h1>Executing traces</h1>
        <Panel className="col-md-12">
          <ProgressBar active now={50} label='Host foo.gc.cs (5/10)' />

          <div>{messages.map(m => <p>{m.type + ': ' + m.message}</p>)}</div>
        </Panel>
        <input className="pull-right" id="debug" type="checkbox" onClick={caller.toggleDebug} /> <label htmlFor="debug">Full output</label><br />
        <Button className="pull-right" onClick={caller.cancelTrace}>Cancel</Button>
      </div>
    );
  }
});
