//Initialize Firebase
var config = {
    apiKey: "AIzaSyBv3ruOzaoY9oJvUzpDFEkOlCq0gEMY63Q",
    authDomain: "train-scheduler-13294.firebaseapp.com",
    databaseURL: "https://train-scheduler-13294.firebaseio.com",
    projectId: "train-scheduler-13294",
    storageBucket: "train-scheduler-13294.appspot.com",
    messagingSenderId: "873168447225"
  };
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

//initializing variables
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
var nextTrain = "";
var minutesAway = 0;

//capture button click
$("#addTrain").on("click", function(){
	// prevent form from trying to submit
  	event.preventDefault();

  	//storing user input into variables
	trainName = $("#trainInput").val().trim();
	destination = $("#destinationInput").val().trim();
	firstTrain = moment($("#firsttraintimeInput").val().trim(), "HH:mm").subtract(1, "years").format("X");
	frequency = $("#frequencyInput").val().trim();
console.log(firstTrain);
	//creating a new variable to store the new train object
	var newTrain = {
		name : trainName,
		place : destination,
		time : firstTrain,
		frequency : frequency
	}

	//pushing the newTrain object into the database
	database.ref().push(newTrain);

	//clear all input fields
	$("#trainInput").val("");
	$("#destinationInput").val("");
	$("#firsttraintimeInput").val("");
	$("#frequencyInput").val("");
})

//function that takes the trains from the database and renders them on the table
database.ref().on("child_added", function (childSnapshot, prevChildKey){
	//console.log(childSnapshot.val());

	//create variables to store train information coming back from the database
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().place;
	var tFirstTrain = childSnapshot.val().time;
	var tFrequency = childSnapshot.val().frequency;

	//calculating minutes until arrival

	//difference between times
	var diffTime = moment().diff(moment.unix(tFirstTrain), "minutes");

	//time apart (remainder)
	var tRemainder = diffTime % tFrequency;

	//minute until arrival
	var minutesAway = tFrequency - tRemainder;

	//next train
	var nextTrain = moment().add(minutesAway, "m").format("hh:mm A");

	//populating table with information from database
	$("#trainTable > tbody").append("<tr><td>"+ tName +"</td> <td>"+ tDestination +"</td> <td>"+ tFrequency +"</td> <td>"+ nextTrain +"</td> <td>"+ minutesAway +"</td></tr>")

}, function (errorObject){
	console.log(errorObject.code);
})








