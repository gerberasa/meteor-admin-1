// import collection apis
import { Choices } from '/imports/api/choices/choices.js';
import { Answers } from '/imports/api/answers/answers.js';

// collections data
Template.App_restricted.onCreated(function() {

  // subscriptions
  Meteor.subscribe('choices.all');
  Meteor.subscribe('answers.all');

});
Template.App_restricted.helpers({
  collections() {
    // return details as array for blaze and inject all data
    return _.map(Template.instance().collectionDetails.get().options, function(collection, key){
      let Collection = {};
      switch(key) {

        // choices
        case 'choices':
          Collection = Choices.find({});
          break;

        // answers
        case 'answers':
          Collection = Answers.find({});
          break;

      }
      return {
        type: key,
        options: collection,
        data_items: Restricted.formatCollection(Collection, key)
      };
    });
  }
});
