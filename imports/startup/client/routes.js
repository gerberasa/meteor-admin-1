import { FlowRouter } from 'meteor/kadira:flow-router';
import { FlowRouterMeta } from 'meteor/ostrio:flow-router-meta';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';

// Meta
import { Meta } from './meta.js';

// Index
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    import('../../ui/pages/home/home.js').then(() => {
      BlazeLayout.render('App_body', { main: 'App_home' });
    });
  },
  link: Meta.front.link,
  script: Meta.front.script
});

// Public

// 404
FlowRouter.notFound = {
  action() {
    import('../../ui/pages/not-found/not-found.js').then(() => {
      BlazeLayout.render('App_body', { main: 'App_notFound' });
    });
  },
  link: Meta.front.link,
  script: Meta.front.script
};

// Admin
FlowRouter.route('/restricted', {
  name: 'App.restricted',
  action() {
    import('../../ui/restricted/restricted.js').then(() => {
      BlazeLayout.render('App_body', { main: 'App_restricted' });
    });
  },
  link: Meta.restricted.link,
  script: Meta.restricted.script
});

// Update meta per route
new FlowRouterMeta(FlowRouter);
