(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var JqueryMixins = require('./jquery_mixins')

var jqueryMixins = new JqueryMixins(firebase);


var config = {
  apiKey: 'AIzaSyAVJQAGggfY5uOFeKV7oXZtECWpZkXrXMA',
  authDomain: 'fifeiros-790df.firebaseapp.com',
  databaseURL: 'https://fifeiros-790df.firebaseio.com/',
  storageBucket: 'gs://fifeiros-790df.appspot.com'
};

firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('#conta').text(user.email)
    $('#logado').removeClass('hide').addClass('show')
    $('#deslogado').removeClass('show').addClass('hide')
  } else {
    $('#deslogado').removeClass('hide').addClass('show')
    $('#logado').removeClass('show').addClass('hide')
  }
});

var messages = firebase.database().ref('messages');
messages.on('child_added', function(data) {
  $('#messages').append( '<li id="'+data.key+'">' + data.val().email.split('@')[0] + '<br>' + data.val().message + '</li>');
});

},{"./jquery_mixins":2}],2:[function(require,module,exports){
function JqueryMixins(firebase){
  this.setBindings();
}

JqueryMixins.prototype.setBindings = function(){
  $(document).on('click','#enviar', this.sendMessage);
  $(document).on('click','#create', this.createUser);
  $(document).on('click','#logar', this.signinUser);
  $(document).on('click','#deslogar', this.signoutUser);
}

JqueryMixins.prototype.sendMessage = function(){
  var message = $('#messageInput').val(),
        user = firebase.auth().currentUser;

    firebase.database().ref('messages').push({
      email: user.email,
      message : message
    });
}

JqueryMixins.prototype.createUser = function(){
  var email = $('#email').val();
    var pass = $('#password').val();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error)
      console.log('deu erro criar')
      // ...
    });
}

JqueryMixins.prototype.signinUser = function(){
   var email = $('#email').val();
    var pass = $('#password').val();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error)
      console.log('deu erro logar')
      // ...
    });
}

JqueryMixins.prototype.signoutUser = function(){
  firebase.auth().signOut().then(function() {
      console.log('deslogou')
      // Sign-out successful.
    }, function(error) {
      console.log('não deslogou')
      // An error happened.
    });
}

//export default JqueryMixins
module.exports = JqueryMixins
},{}]},{},[1]);
