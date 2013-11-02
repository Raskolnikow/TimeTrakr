var DataAccessObject = require('./new_data.js');

var dbConfig = {
	uri: "http://127.0.0.1",
	port: 5984,
	database: "timetrakr",
	view: "_design/designdoc/_view/by_date"
}

var dao = new DataAccessObject(dbConfig);

var now = new Date();
now.setDate(1);

//console.log(now);

//var date = d.toLocaleDateString();
//var date = "Sunday, October 27, 2013";

//dao.updateEntry(now, true);		// start
//dao.updateEntry(now, false);		// stop

dao.getEntry(now, function(data) {
	console.log(data);
});

//dao.newEntry();


