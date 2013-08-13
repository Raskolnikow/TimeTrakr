var request = new XMLHttpRequest();

request.onreadystatechange = function() {
	if(request.readyState == 4) {
		if(request.status == 200) {
			var re = eval("(" + request.responseText + ")");

			document.getElementById("wert").innerHTML = re.zufall;
		}
	}
}

function send() {
	//var wert = Math.floor(Math.random() * 100);
	var obj = {"zufall": "0"};

	request.open('POST', 'http://localhost:8124');	
	request.setRequestHeader("Content-Type", "application/json", true);
	request.send(JSON.stringify(obj))
}

setInterval(send, 2000);

function f(x, y)
{
	var point = new Object()
	point.x = x;
	point.y = y;
	document.writeln(point.x);
}