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