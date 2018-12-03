import { Meteor } from 'meteor/meteor';

// collections
import { Settings } from '/imports/api/_settings/_settings.js';
import { Choices } from '/imports/api/choices/choices.js';
import { Answers } from '/imports/api/answers/answers.js';

// templates / components
import './restricted.html';
import './login/login.js';
import './data-item/data-item.js';

// scoped data
App_restricted = {
  created: false,
  rendered: false,
  materialInterval: null,
  _settings: new ReactiveVar([]),
  data_format: new ReactiveVar([])
};

// on created / reactive data
Template.App_restricted.onCreated(function () {
  // collections
  Meteor.subscribe('_settings.all');
  Meteor.subscribe('choices.all');
  Meteor.subscribe('answers.all');

  // static server methods
  Meteor.call('_settings.client_groups', (error, groups) => {
    if(!error && groups){
      App_restricted._settings.set(groups);
    }
  });

  Meteor.call('data_format', (error, formats) => {
    if(!error && formats){
      App_restricted.data_format.set(formats);
    }
  });
  App_restricted.created = true;
});
Tracker.autorun(function(){
  const loggedIn = Meteor.userId();
  if(App_restricted.created && (loggedIn || !loggedIn)){
    Meteor.call('_settings.client_groups', (error, groups) => {
      if(!error && groups){
        App_restricted._settings.set(groups);
      }
    });
    Meteor.call('data_format', (error, formats) => {
      if(!error && formats){
        App_restricted.data_format.set(formats);
      }
    });
  }
});

// on rendered / materialize
Template.App_restricted.onRendered(function () {
  Tracker.afterFlush(function(){
    App_restricted.materialInterval = Meteor.setInterval(function checkForAPI() {
      if(typeof componentHandler !== 'undefined') {
        componentHandler.upgradeElements(document.querySelector('#restricted'));
        // rendered
        App_restricted.rendered = true;
        Meteor.clearInterval(App_restricted.materialInterval);
      }
    }, 100);
  });
});
Tracker.autorun(function(){
  const loggedIn = Meteor.userId();
  if(App_restricted.rendered && (loggedIn || !loggedIn)){
    Tracker.afterFlush(function(){
      componentHandler.upgradeAllRegistered();
    });
  }
});

// helpers
Template.App_restricted.helpers({
  // settings - formatted
  _settings() {
    return App_restricted._settings.get().map(group => {
      group.method = '_settings.client_update';
      group.data.map(setting => {
        const dbSetting = Settings.findOne({ 'key': setting.key });
        if(dbSetting){
          setting.value = dbSetting.value;
        }
        return setting;
      });
      return group;
    });
  },
  // defaults
  constants() {
    return Constants;
  },
  currentUser() {
    return Meteor.userId();
  },
  loading() {
    return Session.get('loading') ? 'active' : 'false';
  },
  // choices - formatted
  choices() {
    const format = App_restricted.data_format.get()['choices'];
    return Choices.find({}).map(item => {
      if(format){
        return {
          'method': 'choices.client_upsert',
          'title': item.command,
          'data': format.map(data => {
            data.value = item[data.key];
            return _.clone(data);
          })
        }
      }
    });
  },
  choiceAnswers() {
    return Answers.find({
      'command': this.command
    });
  },
  // answers
  answers() {
    const format = App_restricted.data_format.get()['answers'];
    return Answers.find({}).map(item => {
      if(format){
        return {
          'type': 'answers.client_upsert',
          'title': item.command,
          'data': format.map(data => {
            data.value = item[data.key];
            return _.clone(data);
          })
        }
      }
    });
  },
});

// events
Template.App_restricted.events({

  // logout
  'click .logout'(event) {
    event.preventDefault();
    Meteor.logout();
  },

});

// on destroyed / reset
Template.App_restricted.onDestroyed(function () {
  App_restricted.created = false;
  App_restricted.rendered = false;
  Meteor.clearInterval(App_restricted.materialInterval);
});
