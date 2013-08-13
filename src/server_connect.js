var connect = require('connect');

// import middleware
var helloWorld = require('./hello_world');
var writeHeader = require('./write_header');
var replyText = require('./reply_text');

var app = connect();

app.use(connect.static(__dirname + '/public'));

app.use(connect.logger(':method :req[content-type]'));
app.use(connect.bodyParser());

app.use(function(req, res) {
	res.end(JSON.stringify(req.body));
});

app.listen(8124);