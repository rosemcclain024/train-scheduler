
 var config = {
    apiKey: "AIzaSyAfoob8B0CQncB9RaOTnq6Lw7XX7WuM6VU",
    authDomain: "this-cool-thing-im-doing.firebaseapp.com",
    databaseURL: "https://this-cool-thing-im-doing.firebaseio.com",
    projectId: "this-cool-thing-im-doing",
    storageBucket: "this-cool-thing-im-doing.appspot.com",
    messagingSenderId: "133262733163"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();


  var trainName = "";
  var trainDestination = "";
  var trainStart = "";
  var trainFreq = 0;


   $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
     trainName = $("#train-name-input").val()
     trainDestination = $("#destination-input").val();
     trainStart = $("#start-input").val();
     trainFreq = $("#freq-input").val();
  
    database.ref().push({
      name: trainName,
      trainDestination: trainDestination,
      start: trainStart,
      trainFreq: trainFreq
    });
  
     
  
     console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFreq);
  
    alert("train time successfully added");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().trainDestination;
    var start = childSnapshot.val().trainStart;
    var freq = childSnapshot.val().trainFreq;
  

    console.log(name);
    console.log(destination);
    console.log(start);
    console.log(freq);
  

    var frequency = parseInt(freq)

    var dConverted = moment(start, 'HH:mm').subtract(1, 'years');
    var trainTime = moment(dConverted).format('HH:mm');
    var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
    var tDifference = moment().diff(moment(tConverted), 'minutes');
    var tRemainder = tDifference % frequency;
    var minsAway = frequency - tRemainder;
    var nextTrain = moment().add(minsAway, 'minutes');


  

    var newRow = $("<tr>").append(
      $("<td>").text(name),
      $("<td>").text(destination),
      $("<td>").text(freq),
      $("<td>").text(nextTrain));
      $("<td>").text(minsAway);
  ;
  
 
    $("#trainTime-table > tbody").append(newRow);
  });
  