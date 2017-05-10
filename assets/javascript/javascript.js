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
var trainTime = 0;
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
	trainTime = $("#firsttraintimeInput").val().trim();
	frequency = $("#frequencyInput").val().trim();

	//creating a new variable to store the new train object
	var newTrain = {
		name : trainName,
		place : destination,
		time : trainTime,
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