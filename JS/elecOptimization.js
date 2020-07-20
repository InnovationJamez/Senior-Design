/*
	calc the water usage per person
	get the number of people from html element
	calc the number
	set text to the result
*/
function calcWater(){
	// input elemnt number of people
	var num = parseInt(document.getElementById('numPep').value);
	// paragraph element output number
	var p = document.getElementById('waterOut');
	// check if num == 0
	if(num == 0){
		alet("0 is no good!!!");
	}
	// do the calculation if not zero
	else{
		// set the p element
		p.innerHTML = (num * 80) + " to " + (num * 100) + " gallons of water per day";		
	}
}