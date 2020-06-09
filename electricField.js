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

// the height and width of the canvas (px)
can.height = window.innerHeight * 0.7;
can.width = window.innerWidth * 0.9;

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
	update function 
*/
function update(){
	c.clearRect(0, 0, can.width, can.height);
	// set the values to the new scale
	setValues(scaleSlider.value);
	// draw the field
	drawField(c);
}

/*
	function calls
*/
update();
scaleValue.innerHTML = "Value: " + scaleSlider.value;
widthValue.innerHTML = "Value: " + width.value + " m";
heightValue.innerHTML = "Value: " + height.value + " m";

/*
	user input and event listeners
*/


can.addEventListener("click", function(event){
	console.log(event.x + " " + event.y);
});

scaleSlider.addEventListener("change", function(){
	// set the value of the html element
	scaleValue.innerHTML = "Value: " + scaleSlider.value;
	// update the screen
	update();
});

width.addEventListener("change", function(){
	widthValue.innerHTML = "Value: " + width.value + " m";
	theoWidth = width.value;
	update();
});

height.addEventListener("click", function(){
	heightValue.innerHTML = "Value: " + height.value + " m";
	theoHeight = height.value;
	update();
});

