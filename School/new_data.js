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
		var h = (min/60).toFixed();
		var m = (min - Math.floor(min/60)*60);

		if(h < 10) h = "0" + h;
		if(m < 10) m = "0" + m;

		return ( h + ":" + m );
	}

	function putNewEntry(date) {

		var data = {
			date: date.toLocaleDateString(),
			start_time: toMinutes(date),
			end_time: toMinutes(date),
			breaks: 0
		};

		db.insert(data, function(err) {
			if(err) console.log(err);
		})	
	}

	function getEntry(date, func) {

		var s_key = JSON.stringify(date.toLocaleDateString());
		var e_key = JSON.stringify(date.toLocaleDateString());

		var getOptions = {
			start_key: s_key,
			end_key: e_key,
			limit: 10,
			descending: true
		};

		db.get(dbConfig.view, getOptions, function(err, result) {
			if(err) { console.log(err); return; };

			var dat;

			if(result.rows.length != 0) {
				var res = result.rows[0].value;

				dat = {

					date: res.date,
					start: toTimeString(res.start_time),
					end: toTimeString(res.end_time),
					breaks: toTimeString(res.breaks)
				};
			}

			func(dat);
			//console.log(result.rows.length);
		});
	}

	function _getEntry(date, func) {

		var s_key = JSON.stringify(date.toLocaleDateString());
		var e_key = JSON.stringify(date.toLocaleDateString());

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
			else {
				func();
			}
		});
	}

	function updateEntry(date, start, func) {

		_getEntry(date, function(data) {
			if(data == null) {
				console.log("Inserting new Data!!");
				putNewEntry(date);
			} else {
				if(start) {
					data.breaks += (toMinutes(date) - data.end_time);
				} else {
					data.end_time = toMinutes(date);
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