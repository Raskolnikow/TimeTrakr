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
	console.log(JSON.stringify(req.body));
	req.setEncoding('utf8');
	var dat = eval("(" + JSON.stringify(req.body) + ")");
	dat.zufall = Math.floor(Math.random() * 100);
	console.log(dat.zufall);
	res.end(JSON.stringify(dat));
});

app.listen(8124);