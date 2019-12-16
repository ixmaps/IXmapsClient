/* jslint node: true, esnext: true */
'use strict';

var React = require('react'), {Row, ProgressBar, Button, ButtonGroup, Panel, Checkbox, Glyphicon, Label, Table} = require('react-bootstrap'),
  moment = require('moment'),
  createReactClass = require('create-react-class');

module.exports = createReactClass({
  render: function() {
    let {caller, messages, currentStatus, statusMessage, options, progress} = this.props, runningClass = 'col-md-8', readout, count, sendMessages = [],
      action = (
        <div className='pull-right'>
          <Button onClick={this.goback}>Go Back</Button>
          <Button onClick={this.finished}>Finished</Button>
        </div>
      );
    if (currentStatus && currentStatus !== 'done' && currentStatus !== 'trset-completed') {
      action = <Button className="pull-right" onClick={caller.cancelTrace}>Stop after current trace</Button>;
      let current = 100;
      if (progress && progress.total) {
        current = (progress.current / progress.total) * 100;
        count = `${progress.current} / ${progress.total}`;
      }
      runningClass='col-md-4';
      readout = (
        <div className='col-md-4'>
        <ProgressBar bsStyle={currentStatus === 'stopping' ? 'warning' : 'success'} className='trace-progress' active now={current} />
        </div>
      );
    }
    for (let i = 0; i < messages.length; i++) {
      var m = messages[i];
      if (this.state.debug || m.type === 'submitted' || m.type === 'trset-completed' || m.type === 'error' || i == messages.length - 1) {
        sendMessages.push(m);
      }
    }

    let i = 0, output = []
    sendMessages.forEach(m => {
      let display, ltype, date,
        type = m.content && m.content.status ? m.content.status : m.type,
        label = type;
      if (type === 'submitted') {
        label = 'submitted';
        display = (
          <div>
            <div className='col-md-4'>{m.content.dest}<br /><span className='message-dest_ip'>{m.content.dest_ip}</span></div>
            <div className='col-md-2'><a target="trid" href={'https://www.ixmaps.ca/map.php?trid=' + m.content.trid}>{m.content.trid}</a></div>
            <div className='col-md-6'>{m.content ? m.content.submissionMessage : ''}</div>
          </div>
        );
        ltype = 'success';
      } else if (type === 'error') {
        display = <span style={{color: 'red'}}>{m.message}</span>;
        ltype = 'danger';
      } else if (type === 'trset-completed') {
        label = 'completed';
        if (m.content && m.content.trset) {
          display = <span style={{color: 'green'}}>TR Set <b>{m.content.trset}</b> completed. {m.content.succeeded} of {m.content.total} successfully contributed.</span>;
        } else {
          display = <span>m.message</span>;
        }
        ltype = 'success';
      } else {
        ltype = 'info';
        display = (m.message || '').toString().replace(/[\{|}|"]/g, '').replace(/,/g, ', ');
        if (m.content && m.content.dest) {
          display = <div>
            <div className='col-md-4'>{m.content.dest}<br /><span className='message-dest_ip'>{m.content.dest_ip}</span></div>
            <div className='col-md-8'>{display}</div>
          </div>
        }
      }
      date = moment(m.date).format('HH:mm:s');

      output.unshift(
        <Row className='message-row' key={i++}>
          <div className='col-md-2'>
            <div className='col-md-4 text-right'>{i}</div>
            <div className='col-md-8'><Label block className='pull-right update-type' bsStyle={ltype}>{label}</Label></div>
          </div>
          <div className='col-md-2' style={{textAlign: 'center'}}>{date}</div>
          <div className='col-md-8'>{display}</div>
        </Row>);
    });
    return (
      <div>
        <Panel style={{padding: '1em', height: '15em'}}>
          <h1>Generating Traceroutes</h1>
          <div className='generating-submitter'>
            Submitted by <b>{options.submitter || '[noname]'}</b> from <b>{options.city || '[no city]'}</b>,&nbsp;
            <b>{options.postal_code || '[no postal code]'}</b>&nbsp;
            ISP: <b>{options.isp || '[no ISP]'}</b>&nbsp;
            on <b>{moment().format('YYYY-MM-DD HH:mm:s')}</b>
          </div>
          <div className={runningClass}><strong>{options.trset ? 'TR Set: ' + options.trset : options.dest}</strong><br />{count} {statusMessage}</div>
          {readout}
          <div className='col-md-4'>{action}</div>
        </Panel>

        <Panel style={{padding: '1em'}}>
          <Row style={{marginBottom: '1em'}}>
            <div className='col-md-8'>
              <h2>Output</h2>
            </div>
            <div className='col-md-3 text-right'>
              <br />
              <Checkbox id="debug" type="checkbox" onChange={this.toggleDebug}>View all</Checkbox>
            </div>
          </Row>
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
