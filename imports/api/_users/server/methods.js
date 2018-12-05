import { Meteor } from 'meteor/meteor';

// methods
Meteor.methods({

  // secure admin check
  '_users.is_admin'() {
    // check if we're logged in
    if(!this.userId) {
      return false;
    }
    // check for admin flag
    const user = Meteor.user();
    if(user.admin !== true){
      return false;
    }
    return true;
  }

});
