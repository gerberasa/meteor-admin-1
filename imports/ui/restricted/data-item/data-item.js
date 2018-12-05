import { Meteor } from 'meteor/meteor';
import './data-item.html';

// expand or collapse item
Template.data_item.onCreated(function () {
  this.expanded = new ReactiveVar((Template.instance().data.collapse ? false : true));
});
Template.data_item.helpers({
  expanded() {
    return Template.instance().expanded.get();
  }
});
Template.data_item.events({
  'click .expand_more'(event) {
    event.preventDefault();
    event.target.blur();
    Template.instance().expanded.set(true);
  },
  'click .expand_less'(event) {
    event.preventDefault();
    event.target.blur();
    Template.instance().expanded.set(false);
  }
});

// field helpers
Template.data_item.helpers({
  inputDisabled(field) {
    return !this.dataItem.actions.insert && field.input.disabled;
  }
});

// formats field input data
Input_value = function(setting, target){
  const input = target[setting.key]; // dom
  let value = null;
  switch(setting.input.type) {
    case 'text':
    case 'textarea':
      value = input.value;
      break
  }
  return value;
}

// events
Template.data_item.events({
  'submit .data_item'(event) {
    event.preventDefault();
    // vars
    Session.set('restrictedFormLoading', true);
    const form = this.dataItem; // template data
    const target = event.target; // dom
    target.blur();
    let data_items;
    // data differs between settings and others
    if(form.type === '_settings'){
      data_items = form.data.map(setting => {
        // don't include display fields
        if(!setting.input.onlydisplay){
          return {
            'key': setting.key,
            'value': Input_value(setting, target)
          };
        }
      });
    } else {
      data_items = { '_id': form._id };
      form.data.forEach(setting => {
        // don't include display fields
        if(!setting.input.onlydisplay){
          data_items[setting.key] = Input_value(setting, target);
        }
      });
    }
    // update via secure server method
    Meteor.call(form.type+'.client_'+(form.actions.insert ? 'insert' : 'update'), data_items, (error) => {
      if(error){
        Restricted.snackbar('error', error.reason);
      } else {
        Restricted.snackbar('success', 'Updated successfully');
      }
      Session.set('restrictedFormLoading', false);
    });
  },
  'click .data_remove'(event) {
    event.preventDefault();
    // vars
    Session.set('restrictedFormLoading', true);
    const form = this.dataItem; // template data
    event.target.blur();
    // update via secure server method
    Meteor.call(form.type+'.client_remove', form._id, (error) => {
      if(error){
        Restricted.snackbar('error', error.reason);
      } else {
        Restricted.snackbar('success', 'Removed successfully');
      }
      Session.set('restrictedFormLoading', false);
    });
  }
});
