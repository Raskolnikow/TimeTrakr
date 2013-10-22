/*

	USE CASES:

	1. Startzeit aufzeichnen
	2. Stopzeit aufzeichnen
	3. Angesammelten Stunden/Tag berechnen
	4. Überstunden pro Woche
	5. Überstunden pro Monat
	6. Übrestunden gesamt
	7. Tabelarische Auflistung von Zeiten pro Jahr/Monat/Woche/Tag

*/

// ------------------------ functions --------------------

function putNewEntry() {
	var now = new Date();

	var data = {
		date: now.toLocaleDateString(),
		start_time: now.toLocaleTimeString(),
		end_time: now.toLocaleTimeString(),
		breaks: 0
	};

	db.insert(data, function(err) {
		if(err) console.log(err);
	})	
}

function updateEntry(date, time) {

	// 1. find Entry
	// 2. update Entry ( record stop_time, calc break minutes)
}

function findEntry(date) {

	var data = {};

	return data;
}

// -------------------- includes -------------------------

var nano = require('nano');

// -------------------- init -----------------------------

var dbConfig = {
	uri: "http://127.0.0.1",
	port: 5984,
	database: "timetrakr"
}

var couch = nano(dbConfig.uri + ":" + dbConfig.port);
var db = couch.use(dbConfig.database);

// -------------------------------------------------------

putNewEntry();