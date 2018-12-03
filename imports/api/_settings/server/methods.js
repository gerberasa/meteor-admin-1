// Methods related to Settings

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Settings } from '../_settings.js';

// never change from client
Settings.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// client methods
Meteor.methods({

  '_settings.client_groups'() {
    // must be logged in to get groups
    if(!this.userId) {
      throw new Meteor.Error('Unauthorized to get Setting Groups');
    }
    // return group settings with no values
    const app_settings = JSON.parse(Assets.getText('app_settings.json'));
    return app_settings._settings.map(group => {
      group.data.map(setting => {
        return _.omit(setting, 'value');
      })
      return group;
    });
  },

  '_settings.client_update'(items) {
    check(items, Array);
    // must be logged in to edit a setting
    if(!this.userId) {
      throw new Meteor.Error('Unauthorized to update settings');
    }
    // clean items and update multiple settings
    const cleanItems = items.map(item => {
      check(item.key, String);
      check(item.value, String);
      return {
        key: item.key,
        value: item.value,
      }
    });
    cleanItems.forEach(item => {
      console.log(Settings.update({
        'key': item.key
      },{
        $set: { 'value': item.value }
      }));
    });
    return true;
  }

});
