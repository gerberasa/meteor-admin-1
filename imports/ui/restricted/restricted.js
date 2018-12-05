import { Meteor } from 'meteor/meteor';
import { Settings } from '/imports/api/_settings/_settings.js';

// templates / components
import './restricted.html';
import './login/login.js';
import './data-item/data-item.js';
import './account-settings/account-settings.js';
import './collections.js';

// scoped data
Restricted = {
  materialLoaded: false,
  materialInterval: null,
  display: new ReactiveVar('tabs'),
};

// materialize
Restricted.materialize = function(){
  Tracker.afterFlush(function(){
    window.componentHandler.upgradeDom();
    window.componentHandler.upgradeAllRegistered();
    // layout tabs fix - regretting choice of MDL
    // https://github.com/tleunen/react-mdl/issues/66#issuecomment-146244911
    const tabs = document.querySelectorAll('.mdl-layout__tab');
    const panels = document.querySelectorAll('.mdl-layout__tab-panel');
    const layout = document.querySelector('.mdl-js-layout');
    const tabbar = document.querySelector('.mdl-layout__tab-bar');
    for (var i = 0; i < tabs.length; i++) {
      new MaterialLayoutTab(tabs[i], tabs, panels, layout.MaterialLayout);
    }
  });
};
Template.App_restricted.onRendered(function() {
  Restricted.materialInterval = Meteor.setInterval(function checkForAPI() {
    if(typeof componentHandler !== 'undefined') {
      Session.set('pageLoaded', true);
      Restricted.materialLoaded = true;
      Meteor.clearInterval(Restricted.materialInterval);
      Restricted.materialize();
    }
  }, 10);
});
Tracker.autorun(function() {
  const loggedIn = Meteor.userId();
  if(Restricted.materialLoaded && (loggedIn || !loggedIn)){
    Restricted.materialize();
  }
});
Template.App_restricted.onDestroyed(function() {
  Restricted.materialLoaded = false;
  Meteor.clearInterval(Restricted.materialInterval);
});

// snackbars (material alerts)
Restricted.snackbar = function(type, message){
  const snackbar = document.querySelector('#restricted-messages'); // dom
  snackbar.classList.remove('error', 'alert', 'success');
  snackbar.classList.add(type);
  snackbar.MaterialSnackbar.showSnackbar({
    'message': message
  });
}

// misc helpers
Template.App_restricted.helpers({
  constants() {
    return Constants;
  },
  currentUser() {
    return Meteor.userId();
  },
  display() {
    return Restricted.display.get();
  },
  appLoading() {
    return Session.get('restrictedAppLoading') ? 'active' : false;
  },
  formLoading() {
    return Session.get('restrictedFormLoading') ? 'active' : false;
  }
});

// events
Template.App_restricted.events({

  // tabs
  'click .mdl-layout__tab-bar a'(event) {
    Restricted.display.set('tabs');
  },

  // account settings page
  'click .mdl-navigation .change-display'(event) {
    event.preventDefault();
    const displays = ['settings', 'account-settings'];
    const targetDisplay = _.find(displays, function(display){
      return event.target.classList.contains(display);
    });
    Restricted.display.set(targetDisplay);
    const mdl = document.querySelector('.mdl-layout');
    mdl.MaterialLayout.toggleDrawer();
    const activetab = document.querySelector('.mdl-layout__tab-bar a.is-active');
    if(activetab){
      activetab.classList.remove('is-active');
    }
  },

  // logout
  'click .mdl-navigation .logout'(event) {
    event.preventDefault();
    Meteor.logout();
  },

});

// settings and formatting data from json
Template.App_restricted.onCreated(function() {
  const template = Template.instance();
  template.collectionDetails = new ReactiveVar({});
  template.settingsDetails = new ReactiveVar({});
});

// get collection details
Restricted.collectionDetails = function(){
  const template = Template.instance();
  if(!_.isEmpty(template.collectionDetails.get())){
    return template.collectionDetails.get();
  }
  Meteor.call('collection_details', (error, details) => {
    if(!error && details){
      template.collectionDetails.set(details);
      Restricted.materialize();
    }
  });
  return {};
}

// get settings details
Restricted.settingsDetails = function(){
  const template = Template.instance();
  if(!_.isEmpty(template.settingsDetails.get())){
    return template.settingsDetails.get();
  }
  Meteor.call('_settings.details', (error, details) => {
    if(!error && details){
      template.settingsDetails.set(details);
      Restricted.materialize();
    }
  });
  return {};
}

// format collection data
Restricted.formatCollection = function(collection, name){
  const template = Template.instance();
  if(_.isEmpty(template.collectionDetails.get())){
    return [];
  }
  const details = template.collectionDetails.get();
  return collection.map(item => {
    return {
      'type': name,
      'actions': {
        'update': details.options[name].actions.update,
        'remove': details.options[name].actions.remove,
      },
      'title': item[details.options[name].title_key],
      '_id': item._id,
      'data': details.formats[name].map(data => {
        const dataClone = _.clone(data);
        dataClone.value = item[data.key];
        return dataClone;
      })
    };
  });
}

// format collection insert
Restricted.formatInsert = function(name){
  const template = Template.instance();
  const details = template.collectionDetails.get();
  if(details && details.options[name].actions.insert){
    return {
      'type': name,
      'title': 'Create new',
      'actions': { 'insert': true },
      'data': details.formats[name]
    };
  }
  return {};
}

// format settings data
Restricted.formatSettings = function(){
  const template = Template.instance();
  if(_.isEmpty(template.settingsDetails.get())){
    return [];
  }
  return template.settingsDetails.get().map(group => {
    return {
      'type': '_settings',
      'actions': { 'update': true },
      'title': group.title,
      'data': group.data.map(setting => {
        const dbSetting = Settings.findOne({ 'key': setting.key });
        if(dbSetting){
          setting._id = dbSetting._id;
          setting.value = dbSetting.value;
        }
        return setting;
      })
    };
  });
}

// detail helpers
Template.App_restricted.helpers({
  _settings() {
    // - use meteor calls inside this helper (instead of Trackers)
    // this is so that they get reactively called
    // only when used in blaze templates (loggin in/out etc)
    Restricted.collectionDetails();
    Restricted.settingsDetails();
    return Restricted.formatSettings();
  },
  collectionOptions() {
    // used if you need a specific collection option (not an array)
    return Template.instance().collectionDetails.get().options;
  },
  insertFormat(name) {
    return Restricted.formatInsert(this.type);
  }
});
