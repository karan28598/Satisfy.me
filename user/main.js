// Initialize Firebase
var config = {
    apiKey: "AIzaSyBajHdI7IJln6zbW8ReECJz4YaZCavsnSE",
    authDomain: "satisfy-me.firebaseapp.com",
    databaseURL: "https://satisfy-me.firebaseio.com",
    projectId: "satisfy-me",
    storageBucket: "satisfy-me.appspot.com",
    messagingSenderId: "31323616460"
  };
firebase.initializeApp(config);

//Reference messages collection
var messagesRef = firebase.database().ref('messages');

//Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

//Get values
function submitForm(e){
    e.preventDefault();

    var name = getInputVal('name');
    var address = getInputVal('address');
    var phone = getInputVal('phone');
    var dept = getInputVal('dept');
    var scope = getInputVal('scope');
    var issue = getInputVal('issue');

    saveMessage(name, address, phone, dept, scope, issue);

    //Show alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },2000)
}

//Function to get input value
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save messages to firebase
function saveMessage(name, address, phone, dept, scope, issue){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        address: address,
        phone: phone,
        dept: dept,
        scope: scope,
        issue: issue
    });
}

//Twilio
var twilio = require('twilio');

var accountSid = 'a/c sid'; // Your Account SID from www.twilio.com/console
var authToken = 'token';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Your request has been submitted',
    to: 'to no',  // Text this number
    from: 'twilio no' // From a valid Twilio number
})
.then((message) => console.log(message.sid));

// Get the data on a post that has changed
ref.on("child_changed", function(snapshot) {
    var changedPost = snapshot.val();
    console.log("The updated post title is " + changedPost.title);
  });