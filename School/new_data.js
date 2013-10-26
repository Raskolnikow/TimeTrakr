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

function DataAccesObject(config) {

	if(config == null) {
		console.log('Invalid Database Parameter!! EXITING');
		return;
	}

	var dbConfig = config;
	var nano = require('nano');

	var couch = nano(dbConfig.uri + ":" + dbConfig.port);
	var db = couch.use(dbConfig.database);

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

	function getEntry(date) {

		var s_key = JSON.stringify(date);
		var e_key = JSON.stringify(date);

		var data = {};

		var getOptions = {
			start_key: s_key,
			end_key: e_key,
			limit: 10,
			descending: true
		};

		db.get(dbConfig.view, getOptions, function(err, result) {

			if(err) { console.log(err); return; }

			data.date = result.rows[0].key;
			data.s_time = result.rows[0].value.start_time;
			data.e_time = result.rows[0].value.end_time;
			data.breaks = result.rows[0].value.breaks;
			
			/*var messages = result.rows.reverse().map(function(res) {
				return res.value;
			});
			console.log(messages.length);
			console.log(messages);*/

			//return data;
		});

		return data;
	}

	function updateEntry(date, time) {

		// 1. find Entry
		// IF NOT FIND: create new entry 
		// ELSE: update Entry ( record stop_time, calc break minutes)
	}

	return {
		newEntry: putNewEntry,
		getEntry: getEntry
	};
}

module.exports = DataAccesObject;