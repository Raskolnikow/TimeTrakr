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

console.log(date);
console.log(dao.getEntry(date));
//console.log(dao.getEntry("Sunday, October 27, 2013"));
