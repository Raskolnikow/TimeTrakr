var DataAccessObject = require('./new_data.js');

var dbConfig = {
	uri: "http://127.0.0.1",
	port: 5984,
	database: "timetrakr",
	view: "_design/designdoc/_view/by_date"
}

var dao = new DataAccessObject(dbConfig);

var d = new Date();
var date = d.toLocaleDateString();
//var date = "Sunday, October 27, 2013";

//dao.updateEntry(date, '11:00:00', true);

dao.getEntry(date, function(data) {
	console.log(data);
});

//dao.newEntry();


