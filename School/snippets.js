var circle = require('./circle');

var c = circle(1,2,3);
var d = circle(4,5,6);

console.log(c.area().toFixed());
console.log(d.area().toFixed());

/*var fs = require('fs');
fs.readFile('/etc/passwd', function(err, fileContent) {
	if(err) {
		throw err;
	}
	console.log('file content', fileContent.toString());
});

var server = require('net').createServer(function(socket) {
	console.log('new connection');

	socket.setEncoding('utf8');

	socket.write("Hello! You can start typing. Type 'quit' to exit.\n");

	socket.on('data', function(data) {
		console.log('got:', data.toString());
		if(data.trim().toLowerCase() === 'quit') {
			socket.write('Bye bye');
			return socket.end();
		}
		socket.write(data);
	});

	socket.on('end', function() {
		console.log('Client connection ended');
	});
}).listen(4001); 

require('net').createServer(function(socket) {
	var rs = require('fs').createReadStream('/dev/random');
	rs.pipe(socket);
}).listen(4001); */

var fs = require('fs');

require('http').createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'video/mp4'});
	var rs = fs.createReadStream('test.mov');
	rs.pipe(res);
}).listen(4000);