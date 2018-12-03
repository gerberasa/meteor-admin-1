// All Settings-related publications

import { Meteor } from 'meteor/meteor';
import { Settings } from '../_settings.js';

Meteor.publish('_settings.all', function () {

  // never publish to public
  if(!this.userId) {
    this.ready();
    return;
  }
  
  return Settings.find({});
});
