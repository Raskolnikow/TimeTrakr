// A simple node server

var http = require('http');
var fs = require('fs');
var path = require('path');

/* --------------------------------------------------------------- */
var server;

/* --------------------------------------------------------------- */

createServer();
startServer(8124);

/* --------------------------------------------------------------- */

function createServer() {
	server = http.createServer(requestFunc);

}

function startServer(port) {
	server.listen(port);
	console.log('Server running at http://127.0.0.1:8124/');
}

function reportError(err) {
	console.log(err);
}
/*
	Handles request from a client

	@para request: http.ServerRequest
	@para response: http.ServerResponse
*/
function requestFunc(request, response) {
	
	var file = path.normalize('.' + request.url);
	var rs = fs.createReadStream(file);

	rs.on('error', reportError);

	response.writeHead(200);
	rs.pipe(response);	
}

