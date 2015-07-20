/* jslint node: true, esnext: true, browser: true */
'use strict';

var React = require('react'), {Button} = require('react-bootstrap');

var Finished = React.createClass({
  render: function() {
    let {submitted} = this.props, message;
    if (submitted > 0) {
      message = `Thank you for contributing ${submitted} new traceroute` + (submitted > 1 ? 's' : '') + ' to our database. ';
    } else {
        message = 'Thank you for trying the IXmaps traceroute generator. ';
    }
    return (
        <div>
          <p>{message}
          You can view submitted routes from the <a href='http://www.ixmaps.ca/explore.php'>Explore page</a>.</p>

          <p>To see the last 50 routes contributed, select <b>Quick Links</b>, then <b>Last 50 submitted routes</b>.</p>

          <p>To see all the routes you have contributed, select Custom Filters, adjust the filter options to look like this example,
          enter your name / pseudonym in the space provided,
          and then <b>Submit</b>:</p>

          <img src='/custom_filters.png' alt='custom filters filter example' />

          <p>Any IP addresses not already in our database will likely not be located correctly.
          Currently our location correction runs over night, so check back in 24 hours for a more accurate rendering.
          If you still believe the location is incorrect, please flag it on our Explore page.
          Please continue to contribute more traceroutes, especially if you travel to another location or are using a different ISP.</p>

          <p><b>Close this browser window to exit the application.</b></p>

          <Button className='pull-right' onClick={this.goback}>Go Back</Button>
      </div>
    );
  },
  goback: function() {
    this.props.caller.stepCall(this.props.lastPage);
  }
});

module.exports = Finished;
