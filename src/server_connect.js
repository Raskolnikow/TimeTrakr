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
	var dat = {"zufall1": "0","zufall2":"0"};

	dat.zufall1 = Math.floor(Math.random() * 51);
	dat.zufall2 = Math.floor(Math.random() * 51);

	res.end(JSON.stringify(dat));
});

app.listen(8124);