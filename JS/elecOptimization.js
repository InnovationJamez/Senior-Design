/*
	calc the water usage per person
	get the number of people from html element
	calc the number
	set text to the result
*/
function calcWater(){
	// input elemnt number of people
	var num = parseInt(document.getElementById('numPep').value);
	// check if num == 0
	if(num == 0){
		alet("0 is no good!!!");
	}
	// do the calculation if not zero
	else{
		// set the p element
		$("#waterOut").html((num * 80) + " to " + (num * 100) + " gallons of water per day");		
	}
}

/* 
	The function returns the current density
	input paramaters
	K : average specific electrical conductivity of the concentrate and dilute solution in a cell pair
	U : the applied voltage
	delta : the thickness of the cell
	N : the number of cells
*/

function getIDensity(k, U, delta, N){
	// solve for the current density
	var i = (k * U) / (2 * delta * N);
	// return the value
	return i; 
}

/*
	The function returns the degree of desalination 
	input parameters
	zeta : current utilization 
	N : number of cells
	z : is the valence of ions you are trying to filter, assuming we're talking boring old salt water, with sodium chloride, z is effectively 1
	F : Faraday's constant
	Q :  the production rate expressed as the volume change per unit time
	area : membrane area 
*/
function desalDegree(i, zeta, N, z, Q, area){
	// faraday constant
	var F = 9.65 * Math.pow(10, 4);
	// calc the value of desalination
	var d = (i * zeta * N) / (z * F * Q);
	// return the value
	return d;
}

/*
	return the average conductivity of a cell pair
	input parameters
	delta : thickness of the unit cell
	k_c : specific electric conductility of the concentrate
	k_d : specific electric conductivity of the dilute
	rho_a : area resistance of the anion exchange membrane
	rho_c : area resistance of the cation exchange membrane
*/
function getKVal(delta, k_c, k_d, rho_a, rho_c){
	// caluate the electric conductivity value
	var avCon = (2 * delta) / ((delta / k_c) + (delta / k_d) + rho_c + rho_a);
	// return the value
	return avCon;
}

/*
	get the electrical conductivity as a function of the 
	concentration of NaCl ions in the solution
	c: concentration of salt in moles / liter
*/
function getElecConductivity(c){
	var con = -3.093*Math.pow(c, 0.5) + 11.821;
	return con;
}

/*
	store the cation membrane 
	names and cooraspoddinding values
*/
let catMem = {
	"CMV" : 0.14,
	"MC-3470" : 0.34,
	"CM-1" : 0.16,
	"CMX" : 0.18,
	"CMS" : 0.15,
	"CMB" : 0.20,
	"R1010" : 0.04,
	"R4010" : 0.07,
	"RA4010" : 0.64,
	"CDS" : 0.14,
	"CRA" : 0.16
};

/*
	store the anion membrane 
	names and cooraspoddinding values
*/
let anionMem = {
	"AMV":0.12,
	"ASV":0.13,
	"AM-1":0.14,
	"AMX":0.17,
	"ACS":0.17,
	"AFN":0.17,
	"AHA":0.21,
	"R1030":0.04,
	"R4030":0.07,
	"ADP":0.16,
};


/*
	create event listeners for ion selection
*/
// cation membrane
$("#cationSelect").change(function(){
	// get area res value
	var num = catMem[$("#cationSelect").val()];
	// set the value of the text of the selected object
	$("#catResValue").html(num);
});

// anion membrane
$("#anionSelect").change(function(){
	// get the area res value
	var num = anionMem[$("#anionSelect").val()];
	// set the value of the text of the selected object
	$("#anResValue").html(num);
});

// the enter button onclick listener
$("#enterBtn").click(function(){
	/* 
		variables pulled from the html page
	*/
	// get values from inputs
	var inSalinity = parseFloat($("#inSalinity").val());
	// get the selected ion exchange membranes
	var rho_c = catMem[$("#cationSelect").val()];
	var rho_a = anionMem[$("#anionSelect").val()];
	// get the thickness of the unit cell
	var delta = parseFloat($("#delta").val());
	// number of unit cell pairs
	var N = parseFloat($("#N").val());
	// applied voltage
	var U = parseFloat($("#U").val());
	// the value that will be used for the valence
	var z = 1;
	// the production rate that is being used
	var Q = parseFloat($("#Q").val());
	// the efficentsy of the current
	var zeta = parseFloat($("#zeta").val());
	// the area of the membrane
	var area = parseFloat($("#area").val());

	/*
		calculations
	*/

	// caculate the solution and dilute conductivity
	var k_c = getElecConductivity(inSalinity);
	// get average conductivity of cell pair
	var k_av = getKVal(delta, k_c, k_c, rho_a, rho_c);
	// get the current density
	var i = getIDensity(k_av, U, delta, N);
	// get the degree of desalination 
	var desal = desalDegree(i, zeta, N, z, Q, area);
	// output salinity
	var output = inSalinity - desal;

	console.log("k_c: " + k_c);
	console.log("k_av: " + k_av);
	console.log("i: " + i);
	console.log("desal: " + desal);


	/*
		setting the html objects
	*/

	// set the paragraph element to the string text
	$("#out1").html(inSalinity.toFixed(2));
	$("#out2").html(desal.toFixed(2));
	$("#out3").html(output.toFixed(2));
});


$(document).ready(function(){
	$("#catResValue").html(catMem[$("#cationSelect").val()]);
	$("#anResValue").html(anionMem[$("#anionSelect").val()]);
});
