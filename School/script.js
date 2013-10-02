var queue = new Array(10);

var uniID = (function() {
	var id = 0;
	return function() { return id++; };
})();

for (var counter = 0; counter < 10; counter++) {
	queue[counter] = uniID();
};

function output() {
	var content = document.getElementById("content");

	queue.shift();
	queue.push(uniID());

	content.innerHTML = "";
	for (var i = 0; i < 10; i++) {
		content.innerHTML += "d:\\users\\seba>" + "    0x" + queue[i].toString(16) + "</br>";
	};
	
}

function ss() {
	window.setInterval(output, 200);
}




// document.writeln("id: " + uniID() + "</br>");
// document.writeln("id: " + uniID() + "</br>");
// document.writeln("id: " + uniID() + "</br>");



//var s = new String("Hello World from JavaScript");
//document.writeln(s + "</br></br>");


//var now = new Date();
//document.writeln(now.toLocaleString() + "</br></br>");
//output();
