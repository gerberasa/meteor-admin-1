// Methods related to Settings

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Settings } from '../_settings.js';

// client methods
Meteor.methods({

  // only allow admin to read settings from client
  '_settings.details'() {
    // must be admin
    if(!Meteor.call('_users.is_admin')){
      console.log('unauthorized-read-setting-groups', 'Unauthorized to read Settings on client');
      return [];
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

  // only allow admin to update items from client
  '_settings.client_update'(items) {
    check(items, Array);
    // must be admin
    if(!Meteor.call('_users.is_admin')){
      throw new Meteor.Error('unauthorized-update-settings', 'Unauthorized to update settings');
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
      Settings.update({
        'key': item.key
      },{
        $set: { 'value': item.value }
      });
    });
    return true;
  }

});
