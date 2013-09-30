function output() {
	var content = document.getElementById("content");
	for (var i = 0; i < 10; i++) {
		content.innerHTML += "Number: " + i + "</br>";
	};
}

function ss() {
	output();
}
//var s = new String("Hello World from JavaScript");
//document.writeln(s + "</br></br>");


//var now = new Date();
//document.writeln(now.toLocaleString() + "</br></br>");
//output();
