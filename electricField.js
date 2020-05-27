/*
	this document contains the classes and functions 
	for determing the electric field at any point
	and the force vectors that the electric field 
	will indude onto the ions in the water
*/

/*
	constructor for a postion or field vectors
	holds two numbers x and y
	method to convert to polar form
*/
function rectForm(x, y){
	// set the values
	this.xValue = x;
	this.yValue = y;
}

/*
	the polar form of the force vector
	the value is radias and angle
*/
function polarForm(radias, angle){
	// set the values
	this.rValue = radias;
	this.aValue = angle;
}

/*
	stores the attributes for each ion 
*/

function ion(x, y, c){
	// the position of the partactle
	this.position = new rectForm(x, y);
	// the charge of the ion
	this.charge = c;
}

/*
 	get the magnitude of the electric field 
 	at that position E = kQ/r2
 	return the electric field in the rect form
 	k is a constant with a value of 8.99 x 10^9 N m2/C2.
 	Q is the charge 
 	r is the distance between the two points
 	return the force vector in rect form
 */
 function getElectricField(Q, ion, probe){
 	// calculate the distance between the two points
 	var r = getDistance(ion, probe);
 	// k constant value
 	const k = 8.99 * Math.pow(10,9);
 	// calculate the field
 	var field = (k * Q) / (Math.pow(r, 2));
 	// get the angle of the probe to the ion

 }

 /*
	get two rect forms and return 
	the distance between them
 */
function getDistance(rectOne, rectTwo){
	// x component 
	var x = Math.abs(rectOne.xValue - rectTwo.xValue);
	// y component
	var y = Math.abs(rectTwo.xValue - rectTwo.yValue);
	// use pythagerous to find the hypotenuse
	var h = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
	// retutn this value
	return h;
}

/*
	get the agle from one point to another
*/
function getAngle(ion, probe){
	// x component 
	var x = ion.xValue - probe.xValue;
	// y component
	var y = ion.xValue - probe.yValue;
	// the angle between the two points
	var angle = Math.acos(x / getDistance(ion, probe));
	// convet from radians to degrees
	angle = angle * 180 / 3.14159;
	// return the angle value
	return angle;
}

var one = new rectForm(5, 5);
var two = new rectForm(10, 10);
console.log("distance: " + getDistance(one, two));
console.log("angle: " + getAngle(one, two));
