var connect = require('connect');
var helloWorld = require('./hello_world');

var app = connect();

// setup logger middleware
app.use(connect.logger('short'));
// setup the static file server
app.use(connect.static(__dirname + '/public'));

app.use(helloWorld);

app.listen(8080);


