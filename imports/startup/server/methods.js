import { Meteor } from 'meteor/meteor';

// global server methods
Meteor.methods({

  // return just the details for each collections
  'collection_details'() {
    const app_collections = JSON.parse(Assets.getText('app_collections.json'));
    const collection_details = {
      formats: {},
      options: {}
    };
    // _.mapObject not available
    _.each(app_collections, function(collection, key){
      collection_details.formats[key] = collection.format;
      collection_details.options[key] = collection.options;
    });
    return collection_details;
  }

});
