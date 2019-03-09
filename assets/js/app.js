var config = {
    apiKey: "AIzaSyBWDj3wWJrrLx5ksgF6pzSaktMCIyGYmw8",
    authDomain: "train-schedule-shannon.firebaseapp.com",
    databaseURL: "https://train-schedule-shannon.firebaseio.com",
    projectId: "train-schedule-shannon",
    storageBucket: "",
    messagingSenderId: "144991563271"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim().format;
    var trainFrequency = $("#train-frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: firstTrain,
        frequency: trainFrequency
    };

    // uploads newtrain data to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    // clear inputs
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#first-train-input").val("");
    $("#train-frequency-input").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);

    // first train in military time
    var firstTrainMilitaryTime = moment.unix(firstTrain).format("hh:mm");


    // create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(firstTrain),
        $("<td>").text(trainFrequency)
    );

    // append the new row to the table
    $("#train-table > tbody").append(newRow);
});

var trainFrequency = 40;
var firstTime = "7:14";

  // First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

 // Current Time in military time
 var currentTime = moment();
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 // Difference between the times
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);

 // Time apart (remainder)
 var tRemainder = diffTime % trainFrequency;
 console.log(tRemainder);

 // Minute Until Train
 var tMinutesTillTrain = trainFrequency - tRemainder;
 console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

