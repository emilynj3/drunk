$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyApq6BL_akyEpA5ZjAsNSMWK5fGo2RZgh0",
    authDomain: "partytime-2f24f.firebaseapp.com",
    databaseURL: "https://partytime-2f24f.firebaseio.com",
    projectId: "partytime-2f24f",
    storageBucket: "partytime-2f24f.appspot.com",
    messagingSenderId: "256134088756"
  };
  firebase.initializeApp(config);


  // Establish to identify which branch of our Firebase Database
  var mainBranch = firebase.database().ref();

  // Send Data to Firebase
  $('#send-button').click(function() {
    var drunkResponse = $('#message-response').text();
    var userMessage = $('#message-box').text();
    mainBranch.push({
      response : drunkResponse,
      message : userMessage
    });

    // Empty out the divs
    $('#message-box').html('');

  })

  // Recieve Data from Firebase
  var getDataFromFirebase = function() {
    mainBranch.on('child_added', function(myFirebaseItem) {

      // Access the child of the main branch
      var firebaseChild = myFirebaseItem.val();

      // Get the message metadata
      var userMessage = firebaseChild.message;

      // Get the response metadata
      var drunkResponse = firebaseChild.response;


      // $('#messages').append(userMessage + ' by ' + userName);
      $('#messages').append('<div class="message">' + userMessage + " " + drunkResponse + '</div>');

    });
  }

  getDataFromFirebase();


//Strobe Light

 var bodyElement = document.querySelector("body");

 var requestAnimationFrame = window.requestAnimationFrame ||
                             window.mozRequestAnimationFrame ||
                             window.webkitRequestAnimationFrame ||
                             window.msRequestAnimationFrame;

 var delay = 0;

 function changeColor() {
     delay++;

     if (delay > 3) {
         bodyElement.style.backgroundColor = getRandomColor();
         delay = 0;
     }

     requestAnimationFrame(changeColor);
 }
 changeColor();

 function getRandomColor() {
     // creating a random number between 0 and 255
     var r = Math.floor(Math.random()*256);
     var g = Math.floor(Math.random()*256);
     var b = Math.floor(Math.random()*256);

     // going from decimal to hex
     var hexR = r.toString(16);
     var hexG = g.toString(16);
     var hexB = b.toString(16);

     // making sure single character values are prepended with a "0"
     if (hexR.length == 1) {
         hexR = "0" + hexR;
     }

     if (hexG.length == 1) {
         hexG = "0" + hexG;
     }

     if (hexB.length == 1) {
         hexB = "0" + hexB;
     }

     // creating the hex value by concatenatening the string values
     var hexColor = "#" + hexR + hexG + hexB;
     return hexColor.toUpperCase();
 }

});
