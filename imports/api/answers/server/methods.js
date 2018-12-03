// Methods related to answers

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Answers } from '../answers.js';
import { Choices } from '../../choices/choices.js';

// never change from client
Answers.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// server update
Answers_upsert = function(item){
  // if command exists
  const choice = Choices.findOne({
    'command': item.command
  });
  if(!choice){
    console.log('Answers: Command "'+item.command+'" does not exist');
    return false;
  }

  // if command is permitted to certain users
  const permittedArray = choice.permitted.split(',');
  if(permittedArray.length > 0 && !_.contains(permittedArray, item.username)){
    console.log('Answers: Command cannot be used by this user');
    return false;
  }

  // allow users to update previous commands
  return Answers.upsert({
    'command': item.command,
    'username': item.username
  },
  {
    'command': item.command,
    'username': item.username,
    'createdAt': new Date()
  });
}

// client methods
Meteor.methods({
  'answers.client_upsert'(item) {
    check(item, Object);
    check(item.command, String);
    check(item.username, String);

    // must be logged in to edit
    if(!this.userId) {
      throw new Meteor.Error('Answers: update unauthorized');
    }
    return Answers_upsert(item);
  },
});
