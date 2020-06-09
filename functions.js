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
	var y = Math.abs(rectOne.yValue - rectTwo.yValue);
	// use pythagerous to find the hypotenuse
	var h = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
	// retutn this value
	return h;
}

/*
	get the agle from one point to another
	get the angle from the inner coner from
	the side of the ion
       * -- probe
      /| 
	 / | < yDif     t : theta
	/t |
   *-------ion   
      ^ xDif
*/
function getAngle(ion, probe){
	// find the x and y components
	var yDif = ion.yValue - probe.yValue;
	var xDif = ion.xValue - probe.xValue;
	// the angle between the two points
	if(ion.xValue > probe.xValue){
		var angle = 180 - Math.atan(yDif / xDif) * 180 / Math.PI;
	}
	else{
		var angle = 360 - Math.atan(yDif / xDif) * 180 / Math.PI;
	}

	angle = angle % 360;
	// return the angle value
	return angle;
}


// take two lenghts of a triangle reutrn the 
// hypotenuse
function hyp(x, y){
	// square the x value
	var xPow = Math.pow(x, 2);
	// square the y value
	var yPow = Math.pow(y, 2);
	// sum and square route
	var root = Math.pow(xPow + yPow, 0.5);
	// return the value
	return root;
}

/*
	canvas drawing functions and refrcences
*/

// draw the field based on the dimensions of the field
/*
	draw the measurement marks on the field
	make ten marks and display the unit somewhere
*/
function drawField(c){
	// set the fill color to green
	c.fillStyle = "lightgreen";

	// draw the field
	c.fillRect(minX, minY, theoWidth / ratio, theoHeight / ratio);

	// bagin the path
	c.beginPath();
	c.lineStyle = "rgba(20, 20, 20, 0.5)";

	// the number of vertical lines to draw
	var xLen = Math.ceil((theoWidth / ratio) / inc + 1);
	// vartical lines
	for(var i = 0; i < xLen; i++){
		// draw each line
		c.moveTo(i * inc + minX, minY);
		c.lineTo(i * inc + minX, minY + theoHeight / ratio);
	}
	// the number of horizontal lines to draw
	var yLen = Math.ceil((theoHeight / ratio) / inc + 1);
	// horizontal lines
	for(var i = 0; i < yLen; i++){
		// dra each line
		c.moveTo(minX, i * inc + minY);
		c.lineTo(minX + theoWidth / ratio, i * inc + minY);
	}
	c.stroke();

}

/*
	get ion and draw based on charage and position
*/
function drawIon(ion, c){
	// the position in screen space
	var xVal = ion.position.xValue  / ratio + minX;
	var yVal = ion.position.yValue / ratio + minY;
	// draw the circle
	c.beginPath();
	c.arc(xVal, yVal, 5, 0, 2 * Math.PI);
	c.fillStyle = (ion.charge) ? "black" : "red";
	c.fill();
	c.stroke();
}

// draw an arrow pointing in the given angle
function drawArrow(angle, len, x, y, c){
	c.beginPath();
	c.moveTo(-Math.cos(angle * Math.PI / 180) * len + x, 
		Math.sin(angle * Math.PI / 180) * len + y);
	c.lineTo(-Math.cos(angle * Math.PI / 180) * -len + x, 
		Math.sin(angle * Math.PI / 180) * -len + y);
	// Arrow Head
	c.lineTo(-Math.cos((angle - 40) * Math.PI / 180) * -len  * 0.25 + x, 
		Math.sin((angle - 40) * Math.PI / 180) * -len * 0.25 + y);
	c.lineTo(-Math.cos((angle + 40) * Math.PI / 180) * -len * 0.25 + x, 
		Math.sin((angle + 40) * Math.PI / 180) * -len * 0.25 + y);
	c.lineTo(-Math.cos(angle * Math.PI / 180) * -len + x, 
		Math.sin(angle * Math.PI / 180) * -len + y);
	c.strokeStyle = "rgb(" + (len * 10) + ", 0," + (len * 10) + ")";
	c.fillStyle = "rgb(" + (len * 10) + ", 0," + (len * 10) + ")";
    c.lineWidth = 2;
	c.fill();
	c.stroke();
};







