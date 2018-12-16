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
  // if empty fields
  if(item.command === '' || item.username === ''){
    throw new Meteor.Error('missing-fields', 'Missing fields');
  }

  // if command doesn't exists
  const choice = Choices.findOne({
    'command': item.command
  });
  if(!choice){
    throw new Meteor.Error('command-missing', 'Command "'+item.command+'" missing when adding Answer');
  }

  // if command is permitted to certain users
  if(choice.permitted && choice.permitted.length > 0){
    const permittedArray = choice.permitted.split(',');
    if(permittedArray.length > 0 && !_.contains(permittedArray, item.username)){
      throw new Meteor.Error('command-not-permitted', 'Command "'+item.command+'" cannot be used by "'+item.username+'"');
    }
  }

  // allow users to update previous commands
  return Answers.upsert({
    'command': item.command,
    'username': item.username
  },
  {
    'command': item.command,
    'username': item.username,
    'updated': new Date()
  });
}

// client methods
Meteor.methods({
  'answers.client_update'(item) {
    check(item, Object);
    check(item._id, String);
    check(item.command, String);
    check(item.username, String);

    // must be admin
    if(!Meteor.call('_users.is_admin')){
      throw new Meteor.Error('unauthorized-update-answer', 'Unauthorized to update answer');
    }
    Answers_upsert(item);
    return true;
  },
  'answers.client_insert'(item) {
    check(item, Object);
    check(item.command, String);
    check(item.username, String);

    // must be admin
    if(!Meteor.call('_users.is_admin')){
      throw new Meteor.Error('unauthorized-update-answer', 'Unauthorized to update answer');
    }
    Answers_upsert(item);
    return true;
  },
  'answers.client_remove'(_id) {
    check(_id, String);

    // must be admin
    if(!Meteor.call('_users.is_admin')){
      throw new Meteor.Error('unauthorized-remove-answer', 'Unauthorized to remove answer');
    }
    // remove
    Answers.remove({
      '_id': _id
    });
    return true;
  },
});
