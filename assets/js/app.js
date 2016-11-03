'use strict';

var _jquery_mixins = require('jquery_mixins');

var jqueryMixins = new _jquery_mixins.JqueryMixins();

var config = {
  apiKey: 'AIzaSyAVJQAGggfY5uOFeKV7oXZtECWpZkXrXMA',
  authDomain: 'fifeiros-790df.firebaseapp.com',
  databaseURL: 'https://fifeiros-790df.firebaseio.com/',
  storageBucket: 'gs://fifeiros-790df.appspot.com'
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    $('#logado a').attr("href", "mailto:" + user.email);
    $('#logado a').text(user.email);
    $('#logado').removeClass('hide').addClass('show');
    $('#deslogado').removeClass('show').addClass('hide');
  } else {
    $('#deslogado').removeClass('hide').addClass('show');
    $('#logado').removeClass('show').addClass('hide');
  }
});

var messages = firebase.database().ref('messages');
messages.on('child_added', function (data) {
  $('#messages').append('<li id="' + data.key + '">' + data.val().email.split('@')[0] + '<br>' + data.val().message + '</li>');
});
