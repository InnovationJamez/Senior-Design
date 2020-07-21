function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function calcScore(){
	/*
		the total score of the test
	*/
	var score = 0;
	/*
		question one
	*/
	var box1 = exLetters("div1");
	var w1 = ["A", "C", "E"];
	if(cList(box1, w1)){
		score++;
	}

	/*
		question two
	*/
	if(document.getElementById("conc1").checked == true){
		score++;
	}

	/*
		question three
	*/
	if(document.getElementById("goodc4").checked == true){
		score++;
	}	

	/*
		question three
	*/
	if(document.getElementById("form1").checked == true){
		score++;
	}	

	/*
		question five
	*/
	var box5 = exLetters("div3");
	var w5 = ["A", "C", "E", "G"];
	if(cList(box5, w5)){
		score++;
	}

	/*
		print the score
	*/
	console.log(score);
}

/*
	get a drag and drop box return a list of the letters from it
*/

function exLetters(name){
	// raw list of html elements
	var box = document.getElementById(name).children;
	// var to hold the list of letters
	var lett = [];
	// for each element add the inner html to list
	for (var i = box.length - 1; i >= 0; i--) {
		lett.push(box[i].innerHTML);
	}
	// return the list
	return lett;
}

/*
	conpare two strings
*/

function cList(a, wa){
	// len variables
	var li = a.length;
	var lj = wa.length;
	// check the len of a and ca
	if(li.length != lj.length){
		return false;
	}
	// for each answer if incorrent return false
	for(var i = 0; i < li; i++){
		// for each worng answer
		for(var j = 0; j < lj; j++){
			// check answer
			if(a[i] == wa[j]){
				return false;
			}
		}
	}
	// answer is correct
	return true;
}

/*
	submitt the users anwers
*/
function submitt(){
	// get values
	var lName = document.getElementById("lName").value;
	var fName = document.getElementById("fName").value;
	var email = document.getElementById("email").value;

	// check user answers
	if(lName == ""){
		alert("last name is empty");
	}
	else if(fName == ""){
		alert("first name is empty");
	}
	else if(email == ""){
		alert("email is empty");
	}
	else{
		calcScore();
	}
}