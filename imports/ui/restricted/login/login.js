import { Meteor } from 'meteor/meteor';
import './login.html';

Template.login.helpers({
  currentUser() {
    return Meteor.userId();
  },
  constants() {
    return Constants;
  },
});

Template.login.events({
  'submit .login'(event) {
    event.preventDefault();
    Session.set('loading', true);

    const target = event.target;
    const username = target.username.value; // dom
    const password = target.password.value; // dom
    const snackbar = document.querySelector('#restricted-messages'); // dom

    if(!username || !password){
      snackbar.classList.add('error');
      snackbar.MaterialSnackbar.showSnackbar({
        message: "Username and Password needed"
      });
      Session.set('loading', false);
    } else {
      Meteor.loginWithPassword(username, password, function(error){
        if(error){
          snackbar.classList.add('error');
          snackbar.MaterialSnackbar.showSnackbar({
            message: error.reason
          });
        }
        Session.set('loading', false);
      });
    }
  }
});
