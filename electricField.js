/*
	global variables
*/

// refrence to canvas
can = document.getElementById("can");
// context of canvas
c = can.getContext("2d");

/*
	HTML object handlers
*/

// for setting the scale
var scaleSlider = document.getElementById("scale");
var scaleValue = document.getElementById("scaleValue");

// for setting the width
var width = document.getElementById("width");
var widthValue = document.getElementById("widthValue");

// for setting the height
var height = document.getElementById("height");
var heightValue = document.getElementById("heightValue");

// input for setting the voltage
var vInput = document.getElementById("voltage");
var vValue = document.getElementById("voltageValue");

// ratio from thoeretical to pixels
// the one pixel is x metets
var ratio;

// set the increment amount to 0.1m
var inc;

// the theoretical height and width of the field (m)
// must be multaple of 0.1 or wont look good
var theoHeight = height.value;
var theoWidth = width.value;

// bottom corner of the field
var minX;
var minY;

/*
	the voltage drop across the field
	and the charges
*/

var voltage = 5; // unit Volts

// the uniform field between the plates
var uField = voltage / theoWidth;

// the radias of the sphear
const rad = 0.04;

// the list of ions
var ions = [];

/*
	set the values for the sreen ratio and 
	proportions of the screen
*/
function setValues(scale){
	// ratio from thoeretical to pixels
	// the one pixel is x metets
	ratio = scale / can.height;

	// set the increment amount to 0.1m
	inc = 0.1 / ratio;

	// bottom corner of the field
	minX = (can.width / 2) - theoWidth / (ratio * 2);
	minY = (can.height / 2) - theoHeight / (ratio * 2);
}

/*
	add ions to the field
*/
function addIons(num){
	// crear the curent ions
	ions = [];
	// edge buffer
	var b = rad;
	// for each num add ion
	for(var i = 0; i < num; i++){
		//the x value that will be used
		var x = rand(b, theoWidth - b);
		var y = rand(b, theoHeight - b);
		// set the charge of the partacle
		var charge = (Math.random(0,1) > 0.5) ? -1 : 1;
		// add the ion
		ions.push(new ion(x, y, charge));
	}
	update();
}

/*
 called at once when the website is loaded
 */
 function start(){
 	// the height and width of the canvas (px)
	can.height = window.innerHeight * 0.7;
	can.width = window.innerWidth * 0.9;
	// set the initial ui values
	scaleValue.innerHTML = "Value: " + scaleSlider.value;
	widthValue.innerHTML = "Value: " + width.value + " m";
	heightValue.innerHTML = "Value: " + height.value + " m";
	vValue.innerHTML = "Value: " + vInput.value + " V";
 }

/*
	update function 
*/
function update(){
	c.clearRect(0, 0, can.width, can.height);
	// set the values to the new scale
	setValues(scaleSlider.value);
	// draw the field
	drawField(c, voltage);
	// draw ions
	drawIons(ions, c);
	//draw ui text
	drawText();
}

/*
	function calls
*/
start();
update();


/*
	user input and event listeners
*/

can.addEventListener("click", function(event){
	// the actual width of the screen
	var rWidth = theoWidth / ratio;
	// the actual height of the screen
	var rHeight = theoHeight / ratio;
	// check the field was clicked
	if(event.x > minX && event.x < minX + rWidth &&
		event.y > minY && event.y < minY + rHeight){
		// calculate the position in the screen
		var x = event.x * ratio - minX * ratio;
		var y = event.y * ratio - minY * ratio;
		// print the value
		var deltaV = uField * (theoWidth - x);
		console.log("Uniform field: " + uField);
		console.log("Volage drop: " + deltaV);
	}
	else{
		console.log("out side");
	}
});

scaleSlider.addEventListener("change", function(){
	// set the value of the html element
	scaleValue.innerHTML = "Value: " + scaleSlider.value;
	// update the screen
	update();
});

width.addEventListener("change", function(){
	// set the html element
	widthValue.innerHTML = "Value: " + width.value + " m";
	// set the new width
	theoWidth = width.value;
	// clear the ions
	ions = [];
	// call update function
	update();
});

height.addEventListener("change", function(){
	// set the height html element
	heightValue.innerHTML = "Value: " + height.value + " m";
	// set the new height
	theoHeight = height.value;
	// clear the ions
	ions = [];
	// call update function
	update();
});

vInput.addEventListener("change", function(){
	// set the voltage
	voltage = vInput.value;
	// set the height html element
	vValue.innerHTML = "Value: " + voltage + " V";
	//draw ui text
	update();

});

