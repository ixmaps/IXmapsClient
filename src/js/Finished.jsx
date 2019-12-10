/* jslint node: true, esnext: true, browser: true */
'use strict';

var React = require('react'), {Panel, Button} = require('react-bootstrap'),
    createReactClass = require('create-react-class');

// var Finished = createReactClass({
module.exports = createReactClass({
  render: function() {
    let {submitted} = this.props, message;
    if (submitted > 0) {
      message = `Thank you for contributing ${submitted} new traceroute` + (submitted > 1 ? 's' : '') + ' to our database. ';
    } else {
        message = 'Thank you for trying the IXmaps traceroute generator. ';
    }
    return (
        <div style={{paddingTop: '2em'}}>
          <p>{message} You can view submitted routes from the <a href='https://www.ixmaps.ca/map.php' target='_blank'>Map page</a>.</p>

          <p>To see the last 20 routes contributed, select <b>Quick</b>, then <b>Last Contributed</b>.</p>

          <p>To see the routes you have contributed, select <b>Advanced</b>, adjust the filter options to look like this example, enter your name / pseudonym in the space provided, and then <b>Search</b>.</p>

          <Panel>
            <img src='/custom_filters.png' alt='custom filters filter example' className='custom-filters-img' />
          </Panel>

          <p>
            Locating routers or IP address is difficult to do reliably, so please check the accuracy of the routes you've generated,
            especially the location of routers that are close to where you are.
            If you believe the location of any router is incorrect, please Flag it on our Map page so we can correct it later.
          </p>
          <p>
            We are always looking for more traceroute contributions, especially if you travel to another location or are using a different ISP.
          </p>
          <p>Thank you!</p>
          <p style={{textAlign: 'center'}}><b>Close this browser window to exit the application.</b></p>

          <Button className='pull-right' onClick={this.goback}>Go Back</Button>
      </div>
    );
  },
  goback: function() {
    this.props.caller.stepCall(this.props.lastPage);
  }
});

// module.exports = Finished;
