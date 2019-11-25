# 💎 meteor admin / CMS boilerplate
*Featuring [Meteor](https://www.meteor.com/), [MongoDB](https://www.mongodb.com/) & [Material](https://getmdl.io/) Admin*

*...also starring [Blaze](http://blazejs.org) and [Underscore](https://underscorejs.org/)*

![screenshot](https://user-images.githubusercontent.com/13186243/50644982-5647b200-0f6a-11e9-8fec-0a37c70ab5c9.jpg)

#### 🔹 Install
* [install the latest version of Meteor](https://www.meteor.com/install) (tested on 1.7)
* create new app `meteor create APPNAME --full`
* copy across all files and folders from this repo
* install dependencies `meteor npm install`
* change default app constants in `/lib/constants.js` (client data that will never change)
* cd into the app root and run `meteor` to deploy local dev environment at [localhost:3000](http://localhost:3000/)
* to build for production and more, visit [meteor.com/commandline](https://docs.meteor.com/commandline.html)

#### 🔹 Settings
* change default app settings in `/private/app_settings.json` (server only data that can be updated)
* change credentials here for admin login at [localhost:3000/restricted](http://localhost:3000/restricted)

#### 🔹 SCSS, JS Libs and Google Fonts
* stylesheets must be compiled outside of meteor and placed in `/public/scss` (compiled to `public/css`)
* stylesheets, JS libraries and Google Fonts are conditionally loaded via `/imports/startup/client/meta.js`

#### 🔹 Pages and Routes
* create new page templates in `/imports/ui/pages/`
* new URL routes need to go `/imports/startup/client/routes.js`

#### 🔹 API & Collections
* collections have their own folder and files in `/imports/api/`
* format collection data in `/private/app_collections.json`
* default app data can be added here and will be entered through functions at `/imports/startup/server/fixtures.js`
* to edit data within the admin, import/subscribe/include it within `/imports/ui/restricted/collections.js`
* tabs and pages will be generated automatically
* more info about field inputs below...

#### 🔹 Development Tools
* press `CTRL + M` to enable [Meteor Toys](http://meteor.toys/)
* To reset all collections and MongoDB data and deploy as if it's the first time, run `meteor reset` (WARNING - you're resetting all data!)

#### 🔹 Example Data
* Everything within the `_settings` array in `/private/app_settings.json` is example data and can be removed
* There are two example collections; **Choices** and **Answers**. These are located at `/imports/api/choices/` and `/imports/api/answers/` and can be removed.

-------------------

### ✏️ Notes

##### Security and folder structure:
[meteor.com/structure](https://guide.meteor.com/structure.html)

* All files in `/imports/` will not be loaded automatically by Meteor (import files as/when you need them)
* All files in any `client/` folder will be available in the client/browser (unsecure)
* All files in any `server/` folder will only be available to the server (secure)
* All files in `/public/` are available as-is, and served up in the root without "/public/" in the URL
* All files in `/private/` are only accessible from server code and can be loaded via the [Assets API](http://docs.meteor.com/#/full/assets_getText)

##### Collection/Admin input fields:

All data set via `/private/app_settings.json` and `/private/app_collections.json` have various ways of being edited (or not)
The value of `input` has the available options:
```
{
"input": {
    "type": "text", // can be "text" or "textarea" ...more coming soon! 
    "disabled": true, // disables the input
    "notRequired": true, // all inputs are usually required, unless this is set
    "onlydisplay": true, // will not be shown when creating a new item (then becomes disabled)
  }
}
```

* `none` - the value will not be shown in the admin
* `text` - a text field
* `text-disabled` - a text field that will be submitted, but is disabled
* `textarea` - a textarea field
* ...more coming soon!

Remember that only field values submitted via the client method in `/imports/api/COLLECTION/server/methods.js` will be submitted

-------------------

### ⚠️ Fixes

##### Fix for BCRYPT errors (1.7):
```
meteor remove accounts-password
meteor npm uninstall --save bcrypt
meteor npm install --save bcrypt
meteor add accounts-password
```

-------------------

### 🔵 Material

##### Icons:
[material.io/tools/icons](https://material.io/tools/icons/?style=baseline)

Use inline icons with `<i class="material-icons">save</i>`

Use CSS icons with
```
:before {
  font-family: 'Material Icons';
  content: 'check';
  display: inline-block;
  vertical-align: middle;
}
```

##### Useful colour classes:
```
.mdl-color-text--white
.mdl-color--primary
.mdl-color--primary-contrast
.mdl-color--primary-dark
.mdl-color--accent
.mdl-color--accent-contrast
.mdl-color-text--primary
.mdl-color-text--primary-contrast
.mdl-color-text--primary-dark
.mdl-color-text--accent
.mdl-color-text--accent-contrast
```

##### Useful typography classes:
```
.mdl-typography--text-left
.mdl-typography--text-right
.mdl-typography--text-center
.mdl-typography--text-justify
.mdl-typography--text-nowrap
.mdl-typography--text-lowercase
.mdl-typography--text-uppercase
.mdl-typography--text-capitalize
.mdl-typography--font-thin
.mdl-typography--font-light
.mdl-typography--font-regular
.mdl-typography--font-medium
.mdl-typography--font-bold
.mdl-typography--font-black
```

### 🤓 Emoji Favicons

Grab them from [favicon.io/emoji-favicons/](https://favicon.io/emoji-favicons/)

-------------------

### 🌎 Hosting

##### Galaxy
For the easiest way to host your Meteor app (costs min $30/mo), use Meteor's own [Galaxy](https://www.meteor.com/galaxy/signup). However, this will still require third-party hosting for MongoDB.

##### Now
For the cheapest way to host your Meteor app (FREE while prototyping, min $0.99/mo production), use [Now](https://zeit.co/now) v1:

1. Install the amazing https://github.com/jkrup/meteor-now (these guys are awesome!)
2. Register an account with [Now](https://zeit.co/now) and change your account settings to use **Platform Version** `v1`
3. Assign your [custom domain if needed](https://zeit.co/docs/v1/getting-started/assign-a-domain-name/#4.-using-a-custom-domain-with-a-cname)
4. Deploy your app using something like `meteor-now -e MONGO_URL=mongodb://XXXX:XXXX@XXXXX:XXXXX -e ROOT_URL=https://my.app.com`
5. Once successfully deployed, check the status and [create an alias](https://zeit.co/dashboard/deployments) (your custom domain)

##### mLab
Either way you host, you'll need to have your MongoDB seperate. I reccomend using MongoDB's own [mLab](https://mlab.com/). They have a great free tier for prototyping. [For production you will need to upgrade](https://docs.mlab.com/production-guide/).

##### Uploaded File Assets/CDN
...coming soon!
