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
	stores the positon and the polarity of the 
	ion exchange barrior
*/
function barrior(x, pol){
	this.xPos = x;
	this.polar = pol;
}

barrior.prototype.bWidth = 0.05;

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

function ion(x, y, c, r){
	// the position of the partactle
	this.position = new rectForm(x, y);
	// the charge of the ion int -1 or 1
	this.charge = c;
}

// the radias value shared by all charges
ion.prototype.radias = 0.035;

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

	// make sure it lies between 0 and 359
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
	generate a random value within the given boudnaries
*/
function rand(min, max){
	return Math.random() * (max - min) + min;
}

/*
	canvas drawing functions and refrcences
*/

// draw the field based on the dimensions of the field
/*
	draw the measurement marks on the field
	make ten marks and display the unit somewhere
*/
function drawField(c, voltage){
	// set the fill color to green
	c.fillStyle = "lightgreen";

	// draw the field
	c.fillRect(minX, minY, theoWidth / ratio, theoHeight / ratio);

	// bagin the path
	c.beginPath();
	c.strokeStyle = "black";
	c.lineWidth = 0.5;

	// the number of vertical lines to draw
	var xLen = theoWidth / 0.1 + 1;
	// vartical lines
	for(var i = 0; i < xLen; i++){
		// draw each line
		c.moveTo(i * inc + minX, minY);
		c.lineTo(i * inc + minX, minY + theoHeight / ratio);
	}
	// the number of horizontal lines to draw
	var yLen = theoHeight / 0.1 + 1;
	// horizontal lines
	for(var i = 0; i < yLen; i++){
		// dra each line
		c.moveTo(minX, i * inc + minY);
		c.lineTo(minX + theoWidth / ratio, i * inc + minY);

	}
	c.stroke();
	// draw pluses to show the posetive side of the field
	var step = 0.05 / ratio;
	var x = theoWidth / ratio + step + minX;
	var x1 = minX - step;
	var yMin = minY + step;
	// for each space
	for(var i = 0; i < theoHeight / 0.1; i++){
		// draw plus
		drawPlus(x, yMin + i * step * 2, true);
		// draw minus
		drawPlus(x1, yMin + i * step * 2, false);
	}	
}

/*
	draw the info text on the screen
*/
function drawText(){
	// draw the value of the voltage drop of the field
	// draw the voltage in top right coner of the screen
	var text = "Voltage: " + voltage + " V";
	var text2 = "Uniform field: " + (voltage / theoWidth).toFixed(2) + " V/m";
	c.font="30px Arial";
	c.fillStyle="black";
	// draw text
	c.fillText(text, 25, 50);
	c.fillText(text2, 25, 75);
}

/*
	get an x and y postion 
	and draw a plus at that location
*/
function drawPlus(x, y, pos){
	// 0.1 in screen space
	var dist = 0.1 / (2 * ratio);
	c.beginPath();
	// horixontal line
	c.arc(x, y, dist, 0, 2 * Math.PI);
	c.moveTo(x - dist, y);
	c.lineTo(x + dist, y);
	// vetical line
	if(pos){
		c.moveTo(x, y - dist);
		c.lineTo(x, y + dist);
	}
	c.stroke();
}

/*
	get ion and draw based on charage and position
*/
function drawIon(ion, c){
	// the radias of the sphear
	const rad = ion.radias / ratio;
	// the position in screen space
	var xVal = ion.position.xValue  / ratio + minX;
	var yVal = ion.position.yValue / ratio + minY;
	// draw the circle
	c.beginPath();
	c.strokeStyle = "black";
	c.arc(xVal, yVal, rad, 0, 2 * Math.PI);
	c.fillStyle = (ion.charge > 0) ? "black" : "red";
	c.fill();
	// draw the plus or minus
	c.beginPath();
	c.lineWidth = rad / 5;
	c.strokeStyle = "white";
	// vertical line only draw if cation
	if(ion.charge > 0){
		c.moveTo(xVal, yVal + rad * 0.8);
		c.lineTo(xVal, yVal - rad * 0.8);
	}
	// horizontal line
	c.moveTo(xVal + rad * 0.8, yVal);
	c.lineTo(xVal - rad * 0.8, yVal);
	c.stroke();
}

/*
	get a list of ions and draw each ion
	on the field
*/
function drawIons(ions, c){
	// the number of ions
	var len = ions.length;
	// for each ion draw it
	for(var i = 0; i < len; i++){
		drawIon(ions[i], c);
	}
}

/*
draw the ion barriors on the field
*/
function drawBarriors(){
	barriors.forEach(function(item, index) {
		var bsWidth = barrior.prototype.bWidth / (ratio * 2);
		var x1 = item.xPos / ratio - bsWidth + minX;
		c.beginPath();
		c.rect(x1, minY, bsWidth, theoHeight / ratio);
		c.strokeStyle = (item.polar > 0) ? "grey" : "pink";
		c.stroke();
		c.fillStyle = (item.polar > 0) ? "grey" : "pink";
		c.fill();
	});
}

/*
	add barriors to the list
	evenly spaced and alternating charge
*/
function addBarriors(num){
	// set the barriors to 0
	barriors = [];
	// distance between barriors
	var dist = theoWidth / (parseInt(num) + 1);
	// for each add a barrior
	for(var i = 0; i < num; i++){
		var charge = (i % 2 == 1) ? -1 : 1;
		barriors.push(new barrior(dist * (i + 1), charge));
	}
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

/*
if paused start the repeating function
if playing stop the repeating funciton
*/
function setAnim(){
	var stBtn = document.getElementById("stBtn");
	if(ions.length == 0){
		alert("there are no ions to simulate\npress the add ions button");
	}
	else if(state){
		// stop the animation
		clearInterval(anim);
		stBtn.innerHTML = "Start";
	}
	else{
		// start the anim
		anim = setInterval(setNextLocation, 50);
		stBtn.innerHTML = "Pause";
	}
	// toggle anim state
	state = !state;
}

/*
	set the speed of the ion depending on its lication in the field
	find the next location of the partacle 
	if collison dont move
	else move the partacle to the new location
*/
function setNextLocation(){
	// for each partacle conduct this function
	ions.forEach(function(item, index) {
		// calcualte the speed of the partacle
		var speed = calcSpeed(item);
		// find the next location of the partacle
		var nextLoc = new rectForm(item.position.xValue + speed.xValue, 
			item.position.yValue + speed.yValue);
		// check if out of bounds or collide with an ion exchange membrane
		if(nextLoc.xValue + ion.prototype.radias > theoWidth){
			// cillison with right wall
			nextLoc.xValue = theoWidth - ion.prototype.radias;
		}
		else if(nextLoc.xValue - ion.prototype.radias < 0){
			nextLoc.xValue = ion.prototype.radias;
		}
		// check veritcal 
		if(nextLoc.yValue + ion.prototype.radias > theoHeight){
			nextLoc.yValue = theoHeight - ion.prototype.radias;
		}
		else if(nextLoc.yValue - ion.prototype.radias < 0){
			nextLoc.yValue = ion.prototype.radias;
		}

		// loop through each membrane
		barriors.forEach(function(bItem) {
			var xMin = bItem.xPos - barrior.prototype.bWidth / 2;
			var xMax = bItem.xPos + barrior.prototype.bWidth / 2;
	
			if(item.charge == bItem.polar){
				// pass
			}
			// right side collision
			else if(nextLoc.xValue + ion.prototype.radias > xMin && 
						nextLoc.xValue + ion.prototype.radias < xMax){
				nextLoc.xValue = xMin - ion.prototype.radias;
			}
			// left side collision
			else if(nextLoc.xValue - ion.prototype.radias > xMin && 
						nextLoc.xValue - ion.prototype.radias < xMax){
				nextLoc.xValue = xMax + ion.prototype.radias;
			}
			// barrior in middle
			else if(nextLoc.xValue + ion.prototype.ratio > xMax &&
					nextLoc.xValue - ion.prototype.ratio < xMin){
				nextLoc.xValue = (item.charge < 0) ? xMin - ion.prototype.radias : xMax + ion.prototype.radias;
			}
		});


		// move the postion of the partacle
		item.position.xValue = nextLoc.xValue;
		item.position.yValue = nextLoc.yValue;
	});
	update();
}

/* 
get the charge and return the speed of the partacle
have the have some radmom movement with net movement 
retained
*/
function calcSpeed(ion){
	var xSpeed = -ion.charge * 0.01 + rand(-0.005, 0.005);
	var ySpeed = rand(-0.005, 0.005);
	speed = new rectForm(xSpeed, ySpeed);
	return speed;
}







