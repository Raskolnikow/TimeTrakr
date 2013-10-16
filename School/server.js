var connect = require('connect');
var helloWorld = require('./hello_world');

var app = connect();

// setup logger middleware
app.use(connect.logger(':method :req[content-type]'));
// setup the static file server
app.use(connect.static(__dirname + '/public'));
// setup the query middleware
app.use(connect.query());
app.use(connect.bodyParser());

app.use(function(req, res) {
	res.end(JSON.stringify(req.query));
});

app.use(function(req, res) {
	res.end(JSON.stringify(req.body));
});

app.use(helloWorld);

app.listen(8080);


