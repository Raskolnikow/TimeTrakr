var queue = new Array(10);
var base = 16;

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
		switch (base) {
			case 2:
				content.innerHTML += "Bin:" + queue[i].toString(base) + "</br>";
			break;

			case 8:
				content.innerHTML += "Oct:" + "0" + queue[i].toString(base) + "</br>";
			break;

			case 10:
				content.innerHTML += "Dec:" + queue[i].toString(base) + "</br>";
			break;
			
			case 16:
				content.innerHTML += "Hex:" + "0x" + queue[i].toString(base) + "</br>";
			break;

			default: break;
		}
	};
	
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
	window.setInterval(output, 500);
}




// document.writeln("id: " + uniID() + "</br>");
// document.writeln("id: " + uniID() + "</br>");
// document.writeln("id: " + uniID() + "</br>");



//var s = new String("Hello World from JavaScript");
//document.writeln(s + "</br></br>");


//var now = new Date();
//document.writeln(now.toLocaleString() + "</br></br>");
//output();
