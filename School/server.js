var connect = require('connect');
var nano = require('nano');
var helloWorld = require('./hello_world');

var app = connect();


// setup logger middleware
app.use(connect.logger(':method :req[content-type]'));
// setup the static file server
app.use(connect.static(__dirname + '/public'));
// setup the query middleware
app.use(connect.query());
app.use(connect.bodyParser());

app.use(function(req, res) {
	res.end(JSON.stringify(req.query));
});

app.use(function(req, res) {
	res.end(JSON.stringify(req.body));
	console.log(JSON.stringify(req.body));
});

// ---------------------- DataBase Code ---------------------------

var couchdb = nano('http://127.0.0.1:5984');


/*couchdb.db.create('kaiser', function(err) {
	if(err) {console.error(err);}
});*/

var kaiserDB = couchdb.use('kaiser');

/*var js = {
	"date" : Date.now(),
	"items": ["apple", "orange", "kiwi"]
};

kaiserDB.insert(js, function(err) {
	if(err) {console.error(err);}
});*/

/*var couchMapReduceFunc = function(doc) {
	emit([doc.date], doc);
}

var designDoc = {
	"views": {
		"by_date": {
			"map": couchMapReduceFunc.toString()
		}
	}
};

(function insertOrUpdateDesignDoc() {
	kaiserDB.insert(designDoc, '_design/designdoc', function(err) {
		if(err) {
			if(err.status_code === 409) {
				kaiserDB.get('_design/designdoc', function(err, ddoc) {
					if(err) { return console.error(err);}
					designDoc._rev = ddoc._rev;
					insertOrUpdateDesignDoc();
				});
			} else {
				return console.error(err);
			}
		}

	})
}());*/

function getData() {
	var getOptions = {
		/*start_key: JSON.stringify(['date', date]),
		end_key: JSON.stringify(['date', date]),
		limit: 10,*/
		descending: true
	};

	kaiserDB.get('_design/designdoc/_view/by_date', getOptions, function(err, result) {
		if(err) { console.log(err); return; }
		
		var messages = result.rows.reverse().map(function(res) {
			return res.value;
		});
		console.log(messages);
	})
}

getData();

// ---------------------------------------------------------------

// ------------------- JSON Data ---------------------------------

/*{
	date: 09/09/2013,
	start_time: 08:25,
	end_time: 17:10,
	breaks: 45
}*/


// ---------------------------------------------------------------

app.use(helloWorld);

app.listen(8080);


