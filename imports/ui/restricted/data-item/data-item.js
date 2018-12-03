import { Meteor } from 'meteor/meteor';
import './data-item.html';

Template.data_item.onCreated(function () {
  this.expanded = new ReactiveVar(false);
});

Template.data_item.helpers({
  expanded() {
    return Template.instance().expanded.get();
  }
});

// formats input data
Get_data_item_value = function(setting, target){
  const input = target[setting.key]; // dom
  let value = null;
  switch(setting.input) {
    case 'textarea':
      value = input.value;
      break
    case 'text':
      value = input.value;
      break
  }
  return value;
}

Template.data_item.events({

  // expand
  'click .expand_more'(event) {
    event.preventDefault();
    Template.instance().expanded.set(true);
  },
  'click .expand_less'(event) {
    event.preventDefault();
    Template.instance().expanded.set(false);
  },

  // update data
  'submit .data_item'(event) {
    event.preventDefault();
    // vars
    Session.set('loading', true);
    const form = this; // template data
    const target = event.target; // dom
    const snackbar = document.querySelector('#restricted-messages'); // dom
    target.blur();
    let data_items;
    // data differs between settings and others
    if(form.method === '_settings.client_update'){
      data_items = form.data.map(setting => {
        const value = Get_data_item_value(setting, target);
        return {
          'key': setting.key,
          'value': value
        };
      });
    } else {
      data_items = {};
      form.data.forEach(setting => {
        const value = Get_data_item_value(setting, target);
        data_items[setting.key] = value;
      });
    }
    // update via secure server method
    Meteor.call(form.method, data_items, (error) => {
      if(error){
        snackbar.classList.add('error');
        snackbar.MaterialSnackbar.showSnackbar({
          message: error.reason
        });
      } else {
        snackbar.classList.add('success');
        snackbar.MaterialSnackbar.showSnackbar({
          message: 'Updated successfully'
        });
      }
      Session.set('loading', false);
    });
  }

});
