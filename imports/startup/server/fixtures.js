import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Settings } from '../../api/_settings/_settings.js';

// databases
import { Choices } from '../../api/choices/choices.js';
import { Answers } from '../../api/answers/answers.js';

Meteor.startup(() => {

  // settings
  const app_settings = JSON.parse(Assets.getText('app_settings.json'));

  // admin / restricted user
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser(app_settings.admin);
    console.log('No user set - Admin has been created');
  }

  // Add a Setting if it doesn't exist
  app_settings._settings.forEach(group => {
    group.data.forEach(setting => {
      if(!Settings.findOne({
        'key': setting.key
      })){
        Settings.insert({
          'key': setting.key,
          'value': setting.value
        });
        console.log('New setting created for "'+setting.key+'"');
      }
    });
  });

  // data
  const app_data = JSON.parse(Assets.getText('app_data.json'));

  // Choices
  // default data if collection is empty
  if (Choices.find().count() === 0) {
    console.log('Choices - adding default data x '+app_data.choices.data.length);
    app_data.choices.data.forEach(item => {
      Choices_upsert(item);
    });
  }

  // Answers
  // default data if collection is empty
  if (Answers.find().count() === 0) {
    console.log('Answers - adding default data x '+app_data.answers.data.length);
    app_data.answers.data.forEach(item => {
      Answers_upsert(item);
    });
  }

});
