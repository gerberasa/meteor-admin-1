// All Answers-related publications

import { Meteor } from 'meteor/meteor';
import { Answers } from '../answers.js';

Meteor.publish('answers.all', function () {
  return Answers.find({});
});
