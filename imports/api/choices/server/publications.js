// All Choices-related publications

import { Meteor } from 'meteor/meteor';
import { Choices } from '../choices.js';

Meteor.publish('choices.all', function () {
  return Choices.find({});
});
