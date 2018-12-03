// Methods related to choices

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Choices } from '../choices.js';

// never change from client
Choices.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// server update
Choices_upsert = function(item){
  return Choices.upsert({
    'command': item.command
  }, {
    'command': item.command,
    'question': item.question,
    'permitted': item.permitted
  });
}

// client methods
Meteor.methods({
  'choices.client_upsert'(item) {
    check(item, Object);
    check(item.command, String);
    check(item.question, String);
    check(item.permitted, String);

    // must be logged in to edit
    if(!this.userId) {
      throw new Meteor.Error('Choices: update unauthorized');
    }
    return Choices_upsert(item);
  },
});
