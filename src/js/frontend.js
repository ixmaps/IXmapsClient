/* jslint node: true, esnext: true */


var React = require('react');

var InputForm = require('./InputForm.jsx');

start(window.electro);

function start(electro) {
    console.log(ipc.sendSync('synchronous-message', 'ping')); // prints "pong"

    var remote = electro.require('remote');

    var Menu = remote.require('menu');
    var MenuItem = remote.require('menu-item');

    var menu = new Menu();
    menu.append(new MenuItem({ label: 'MenuItem1', click: function() { console.log('item 1 clicked'); } }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));

    window.ipc.on('asynchronous-reply', function(arg) {
      console.log(arg); // prints "pong"
    });


    window.ipc.on('ping', function(message) {
      console.log('start', message);  // Prints "whoooooooh!"
    });

    React.render(<InputForm submitTrace={submitTrace} />, document.getElementById('main'));
}

function submitTrace(options) {
  console.log(options);

  window.ipc.send('raw-trace', options);
}
