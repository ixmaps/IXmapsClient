/* jslint node: true, esnext: true */

var React = require('react'), {Row, ProgressBar, Button, ButtonGroup, Panel, Input, Glyphicon, Label, Table} = require('react-bootstrap'),
  moment = require('moment');

module.exports = React.createClass({
  render: function() {
    let {caller, messages, currentStatus, statusMessage, options, progress} = this.props, readout, count, sendMessages = [],
      action = (
        <div className='pull-right'>
          <Button onClick={this.finished}>Finished</Button>
          <Button onClick={this.goback}>Go back</Button>
        </div>
      );
    if (currentStatus && currentStatus !== 'done') {
      action = <Button className="pull-right" onClick={caller.cancelTrace}>Stop after current trace</Button>;
      let current = 100;
      if (progress && progress.total) {
        current = (progress.current / progress.total) * 100;
        count = `${progress.current} / ${progress.total}`;
      }
      readout = <ProgressBar bsStyle={currentStatus === 'stopping' ? 'warning' : 'success'} className='trace-progress' active now={current} />;
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
        display = (
          <div>
            <div className='col-md-8'>{m.content.dest}<br /><span className='message-dest_ip'>{m.content.dest_ip}</span></div>
            <div className='col-md-4'><a target="trid" href={'https://www.ixmaps.ca/explore.php?trid=' + m.content.trid}>{m.content.trid}</a></div>
          </div>
        );
        ltype = 'success';
      } else if (m.type === 'error') {
        display = <span style={{color: 'red'}}>{m.message}</span>;
        ltype = 'danger';
      } else {
        display = m.message;
        ltype = 'info';
      }
      date = moment(m.date).format('HH:m:s');

      output.unshift(
        <Row className='message-row' key={i++}>
          <div className='col-md-1' style={{textAlign: 'right'}}>{i}</div>
          <div className='col-md-1'><Label bsSize='large' className='pull-right' bsStyle={ltype}>{m.type}</Label></div>
          <div className='col-md-2' style={{textAlign: 'center'}}>{date}</div>
          <div className='col-md-4'>{display}</div>
          <div className='col-md-4'>{m.content ? m.content.submissionMessage : ''}</div>
        </Row>);
    });
    return (
      <div>
        <Panel>
          <h1>Generating Traceroutes</h1>
          <div className='generating-submitter'>
            Submitted by <b>{options.submitter || '[noname]'}</b> from <b>{options.city || '[no city]'}</b>,&nbsp;
            <b>{options.postal_code || '[no postal code]'}</b>&nbsp;
            ISP: <b>{options.isp || '[no ISP]'}</b>&nbsp;
            on <b>{moment().format('YYYY-MM-DD HH:m:s')}</b>
          </div>
          <div className='col-md-4'><strong>{options.trset ? 'TR Set: ' + options.trset : options.dest}</strong><br />{count} {statusMessage}</div>
          <div className='col-md-4'>{readout}</div>
          <div className='col-md-4'>{action}</div>
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
  goback: function() {
    this.props.caller.stepCall('Destination');
  },
  finished: function() {
    this.props.caller.stepCall('Finished', 'Destination');
  }
});
