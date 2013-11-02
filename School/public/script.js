var ajax = new XMLHttpRequest();
if(ajax == null)
	alert('AJAX not supported!');

function trackTime() {
	var time_out = document.getElementById("time_output");

	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4) {
			if(ajax.status == 200) {
				var res = eval("(" + ajax.responseText + ")");

				//document.cookie = "end_time=" + res;
				time_out.innerHTML = res;
			}
		}
	}

	ajax.open("POST", "192.168.172.32:8080");
	ajax.setRequestHeader("Content-Type", "application/json");

	var now = new Date();

	ajax.send(JSON.stringify({"now" : now.getTime()}));
}

function showtime() {

	var time_out = document.getElementById("time_output");

	time_out.innerHTML = "00:00";
}

function getTime() {
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();

	if(h < 10) h = '0' + h.toString();
	if(m < 10) m = '0' + m.toString();

	return (h + ':' + m);
}

//window.setInterval(showtime, 10000);