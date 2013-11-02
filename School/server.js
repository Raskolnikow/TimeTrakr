var connect = require('connect');
var nano = require('nano');
var helloWorld = require('./hello_world');
var DataAccessObject = require('./new_data.js');

var dbConfig = {
	uri: "http://127.0.0.1",
	port: 5984,
	database: "timetrakr",
	view: "_design/designdoc/_view/by_date"
};

var app = connect();


// setup logger middleware
app.use(connect.logger('tiny'));
// setup the static file server
app.use(connect.static(__dirname + '/public'));
// setup the query middleware
app.use(connect.query());
app.use(connect.bodyParser());

var dao = new DataAccessObject(dbConfig);

app.use(function(req, res) {
	if(req.method !== 'GET') {
		var stamp = new Date(req.body.now);
		var stamp2 = new Date(req.body.now);

		// ---------------------------------------

		dao.updateEntry(stamp, true);

		stamp2.setHours(stamp2.getHours() + 8);
		res.end(JSON.stringify(stamp2.toLocaleTimeString().substring(0,5)));
	}
});

app.listen(8080);


