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

	function toMinutes(date) {
		return (date.getHours() * 60 + date.getMinutes());
	}

	function toTimeString(min) {
		return (min/60 + ":" + (min - Math.floor(min/60)) + ":00").toString();
	}

	function putNewEntry() {
		var now = new Date();

		var data = {
			date: now.toLocaleDateString(),
			start_time: toMinutes(now),
			end_time: toMinutes(now),
			breaks: 0
		};

		db.insert(data, function(err) {
			if(err) console.log(err);
		})	
	}

	function getEntry(date, func) {

		var s_key = JSON.stringify(date);
		var e_key = JSON.stringify(date);

		var getOptions = {
			start_key: s_key,
			end_key: e_key,
			limit: 10,
			descending: true
		};

		db.get(dbConfig.view, getOptions, function(err, result) {
			if(err) { console.log(err); return; };

			if(result.rows.length != 0) {
				func(result.rows[0].value);
			}
		});
	}

	function updateEntry(date, time, start, func) {

		// 1. find Entry
		// IF NOT FIND: create new entry 
		// ELSE: update Entry ( record stop_time, calc break minutes)

		getEntry(date, function(data) {
			if(data == null) {
				putNewEntry();
				updateEntry(date, time, func);
			} else {
				if(start) {
					data.breaks = toMinutes(time) - data.end_time;
				} else {
					data.end_time = toMinutes(time);
				}

				db.insert(data, function(err) {
					if(err) { console.log(err); }
				});
			}
		});
	}

	return {
		newEntry: putNewEntry,
		getEntry: getEntry,
		updateEntry: updateEntry
	};
}

module.exports = DataAccesObject;