import { Meteor } from 'meteor/meteor';
import './account-settings.html';

Template.account_settings.helpers({
  currentUser() {
    return Meteor.userId();
  },
});

Template.account_settings.events({

  // update data
  'submit .change_password'(event) {
    event.preventDefault();
    // vars
    Session.set('restrictedFormLoading', true);
    const target = event.target; // dom
    const old_password = target.old_password.value; // dom
    const new_password = target.new_password.value; // dom
    target.blur();
    if(old_password === '' || new_password === ''){
      Restricted.snackbar('error', 'Both passwords needed');
      Session.set('restrictedFormLoading', false);
    } else {
      Accounts.changePassword(old_password, new_password, function(error){
        if(error){
          Restricted.snackbar('error', error.reason);
        } else {
          target.old_password.value = '';
          target.new_password.value = '';
          Restricted.snackbar('success', 'Password changed');
        }
        Session.set('restrictedFormLoading', false);
      });
    }
  }

});
