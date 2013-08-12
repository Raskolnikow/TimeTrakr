// A simple node server

var http = require('http');

/* --------------------------------------------------------------- */
var server;

/* --------------------------------------------------------------- */

createServer();
startServer(8124);

/* --------------------------------------------------------------- */

function createServer() {
	server = http.createServer(requestFunc)
}

function startServer(port) {
	server.listen(port);
	console.log('Server running at http://127.0.0.1:8124/');
}

/*
	Handles request from a client

	@para request: http.ServerRequest
	@para response: http.ServerResponse
*/
function requestFunc(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end('<h1><b>Hello World</b></h1>');
	console.log('Station connected!!\nMethod: ' + request.url)	
}

