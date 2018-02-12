const page = require('page')
const empty = require('empty-element')
const yo = require('yo-yo')

var config = {
    apiKey: "AIzaSyDqKAyPcWLXD3qJ9KKbEjcoaOOLOy3cp_I",
    authDomain: "colegioa-11269.firebaseapp.com",
    databaseURL: "https://colegioa-11269.firebaseio.com",
    projectId: "colegioa-11269",
    storageBucket: "colegioa-11269.appspot.com",
    messagingSenderId: "362258868098"
}

page('/', (ctx, next) => {
	firebase.initializeApp(config)
	var provider = new firebase.auth.GoogleAuthProvider()




	firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
})