var nano = require('nano');

var dbConfig = {
	uri: "http://127.0.0.1",
	port: 5984,
	database: "timetrakr"
};

var viewDoc = {
	"views" : {
		"by_date": {
			"map": byDate.toString()
		}
	}
};

var couch = nano(dbConfig.uri + ":" + dbConfig.port);
var db = couch.use(dbConfig.database);

var byDate = function(doc) {
	if(doc.date) {
		emit(doc.date, doc);
	}
};

(function insertOrUpdateDesignDoc() {
	db.insert(viewDoc, '_design/designdoc', function(err) {
		if(err) {
			if(err.status_code === 409) {
				db.get('_design/designdoc', function(err, ddoc) {
					if(err) { return console.error(err);}
					viewDoc._rev = ddoc._rev;
					insertOrUpdateDesignDoc();
				});
			} else {
				return console.error(err);
			}
		}

	})
}());