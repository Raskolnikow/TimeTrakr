var request = new XMLHttpRequest();
var fig = ["2","3","4","5","6","7","8","9","10","J","D","K","A"];
var col = ["♥","♦","♣","♠"];
var cc = ["red", "blue", "green", "black"];

request.onreadystatechange = function() {
	if(request.readyState == 4) {
		if(request.status == 200) {
			var re = eval("(" + request.responseText + ")");

			var col1 = Math.floor(re.zufall1/13);
			var col2 = Math.floor(re.zufall2/13);

			document.getElementById("wert1").innerHTML = fig[re.zufall1 % 13];
			document.getElementById("wert2").style.color = cc[col1];
			document.getElementById("wert2").innerHTML = col[col1];

			document.getElementById("wert3").innerHTML = fig[re.zufall2 % 13];
			document.getElementById("wert4").style.color = cc[col2];
			document.getElementById("wert4").innerHTML = col[col2];
		}
	}
}

function send() {
	request.open('POST', 'http://localhost:8124');	
	request.setRequestHeader("Content-Type", "application/json", true);
	request.send(null);
}

setInterval(send, 5000);