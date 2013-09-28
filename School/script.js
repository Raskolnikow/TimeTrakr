function output() {
	for (var i = 0; i < 10; i++) {
		document.writeln("Number: " + i + "</br>");
	};
}

function mani(s) {
	s = new String("Bye");
}

var s = new String("Hello World");
document.writeln(s + "</br></br>");
mani(s);
document.writeln(s+ "</br></br>");



var now = new Date();
document.writeln(now.toLocaleString() + "</br></br>");
output();
