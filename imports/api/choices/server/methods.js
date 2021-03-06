// Methods related to choices

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Choices } from '../choices.js';
import { Answers } from '../../answers/answers.js';

// never change from client
Choices.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// server update
Choices_upsert = function(item){
  // if empty fields
  if(item.command === '' || item.question === ''){
    throw new Meteor.Error('missing-fields', 'Missing fields');
  }

  return Choices.upsert({
    '_id': item._id
  }, {
    'command': item.command,
    'question': item.question,
    'permitted': item.permitted
  });
}
Choices_remove = function(_id){
  // also delete all Answers related to this choice
  const choice = Choices.findOne({
    '_id': _id
  });
  if(!choice){
    throw new Meteor.Error('choice-missing', 'Choice missing while trying to remove');
  }
  Answers.remove({
    'command': choice.command
  });

  return Choices.remove({
    '_id': _id
  });
}

// client methods
Meteor.methods({
  'choices.client_update'(item) {
    check(item, Object);
    check(item._id, String);
    check(item.command, String);
    check(item.question, String);
    check(item.permitted, String);

    // must be admin
    if(!Meteor.call('_users.is_admin')){
      throw new Meteor.Error('unauthorized-upsert-choice', 'Unauthorized to update choice');
    }
    Choices_upsert(item);
    return true;
  },
  'choices.client_insert'(item) {
    check(item, Object);
    check(item.command, String);
    check(item.question, String);
    check(item.permitted, String);

    // must be admin
    if(!Meteor.call('_users.is_admin')){
      throw new Meteor.Error('unauthorized-update-choice', 'Unauthorized to update choice');
    }
    Choices_upsert(item);
    return true;
  },
  'choices.client_remove'(_id) {
    check(_id, String);

    // must be admin
    if(!Meteor.call('_users.is_admin')){
      throw new Meteor.Error('unauthorized-remove-choice', 'Unauthorized to remove choice');
    }
    // remove
    Choices_remove(_id);
    return true;
  },
});
