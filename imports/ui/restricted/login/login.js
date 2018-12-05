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
    Session.set('restrictedAppLoading', true);
    const target = event.target;
    const username = target.username.value; // dom
    const password = target.password.value; // dom
    if(username === '' || password === ''){
      Restricted.snackbar('error', 'Username and Password needed');
      Session.set('restrictedAppLoading', false);
    } else {
      Meteor.loginWithPassword(username, password, function(error){
        if(error){
          Restricted.snackbar('error', error.reason);
        }
        Session.set('restrictedAppLoading', false);
      });
    }
  }
});
