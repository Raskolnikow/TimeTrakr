var queue = new Array(10);
var base = 16;

var uniID = (function() {
	var id = 1000000000;
	return function() { return id++; };
})();

for (var counter = 0; counter < 10; counter++) {
	queue[counter] = uniID();
};

function output() {
	var content = document.getElementById("content");
	var foot = document.getElementById("footer");

	queue.shift();
	queue.push(uniID());

	content.innerHTML = "";
	for (var i = 0; i < 10; i++) {
		switch (base) {
			case 2:
				content.innerHTML += queue[i].toString(base) + "</br>";
			break;

			case 8:
				content.innerHTML += "0" + queue[i].toString(base) + "</br>";
			break;

			case 10:
				content.innerHTML += queue[i].toString(base) + "</br>";
			break;

			case 16:
				content.innerHTML += "0x" + queue[i].toString(base) + "</br>";
			break;

			default: break;
		}
	};
	
	foot.innerHTML = "Rnd# : " + (Math.random() * 100).toFixed();
}

function btnBinary() {
	base = 2;
}

function btnHex() {
	base = 16;
}

function btnOctal() {
	base = 8;
}

function btnDecimal() {
	base = 10;
}

function ss() {
	window.setInterval(output, 100);

	var w = window.open();
	var d = w.document;
	d.open();
	d.write("<h1>Hello World!</h1>");
	d.close();
}




// document.writeln("id: " + uniID() + "</br>");
// document.writeln("id: " + uniID() + "</br>");
// document.writeln("id: " + uniID() + "</br>");



//var s = new String("Hello World from JavaScript");
//document.writeln(s + "</br></br>");


//var now = new Date();
//document.writeln(now.toLocaleString() + "</br></br>");
//output();
