import { Meteor } from 'meteor/meteor';

// global server methods
Meteor.methods({

  // return just the format for collections
  'data_format'() {
    let data_format = {};
    const app_data = JSON.parse(Assets.getText('app_data.json'));
    // _mapObject not available
    _.each(app_data, function(collection, key){
      data_format[key] = collection.format;
    });
    return data_format;
  }

});
