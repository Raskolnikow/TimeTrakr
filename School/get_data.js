var nano = require('nano');

var dbConfig = {
	uri: "http://127.0.0.1",
	port: 5984,
	database: "timetrakr",
	view: "_design/designdoc/_view/by_date"
};

var couch = nano(dbConfig.uri + ":" + dbConfig.port);
var db = couch.use(dbConfig.database);

var d = new Date();
var date = d.toLocaleDateString();

var getOptions = {
	start_key: JSON.stringify(date),
	end_key: JSON.stringify(date),
	limit: 10,
	descending: true
};

(function getData() {
	db.get(dbConfig.view, getOptions, function(err, result) {
		if(err) { console.log(err); return; }
		
		var messages = result.rows.reverse().map(function(res) {
			return res.value;
		});
		console.log(messages);
	});
}());