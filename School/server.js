var connect = require('connect');
var nano = require('nano');
var helloWorld = require('./hello_world');

var app = connect();


// setup logger middleware
app.use(connect.logger(':method :req[content-type]'));
// setup the static file server
app.use(connect.static(__dirname + '/public'));
// setup the query middleware
//app.use(connect.query());
app.use(connect.bodyParser());

app.use(function(req, res) {
	res.end(JSON.stringify(req.body));
	console.log(JSON.stringify(req.body));
});

// ---------------------- DataBase Code ---------------------------

var couchdb = nano('https://trakr.iriscouch.com');
var kaiserDB = couchdb.use('kaiser');


/*kaiserDB.insert({"when" : Date()}, function(err) {
	if(err) {console.error(err);}
});*/

var couchMapReduceFunc = function(doc) {
	emit([doc.when], doc);
}

var designDoc = {
	language: "Javascript",
	views: {
		by_room: {
			map: couchMapReduceFunc.toString()
		}
	}
};

/*(function insertOrUpdateDesignDoc() {
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
		start_key: JSON.stringify(['when', 0]),
		end_key: JSON.stringify(['when', 0]),
		limit: 10,
		descending: true
	};

	kaiserDB.get('_design/designdoc/_view/by_room', getOptions, function(err, result) {
		if(err) { console.log(err); return; }
		
		var messages = result.rows.reverse().map(function(res) {
			return res.value;
		});
		console.log(messages);
	})
}

getData();



/*couchdb.db.create('kaiser', function(err) {
	if(err) {console.error(err);}
	var kaiserDB = couchdb.use('kaiser');
});*/

// ---------------------------------------------------------------


app.use(helloWorld);

app.listen(8080);


