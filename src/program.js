document.writeln("Hello World!\n");
f(2.3, 4.5);

function f(x, y)
{
	var point = new Object()
	point.x = x;
	point.y = y;
	document.writeln(point.x);
}