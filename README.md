# 💎 hiven meteor boilerplate
*Using [Meteor](https://www.meteor.com/), [MongoDB](https://www.mongodb.com/), [Blaze](http://blazejs.org) & [Material](https://getmdl.io/) Admin*

#### 🔹 Install
* [install the latest version of Meteor](https://www.meteor.com/install) (tested on 1.7)
* create new app `meteor create APPNAME --full`
* copy across files and folders from this repo
* install dependencies `meteor npm install`
* change default app constants in `/lib/constants.js` (client data that will not change)
* cd into the app root and run `meteor` to deploy local dev environment at [localhost:3000](http://localhost:3000/)
* to build for production and more, visit [meteor.com/commandline](https://docs.meteor.com/commandline.html)

#### 🔹 Settings
* change default app settings in `/private/app_settings.json` (server only data that can be updated)
* change credentials here for admin login at [localhost:3000/restricted](http://localhost:3000/restricted)

#### 🔹 SCSS & JS Libs
* stylesheets must be compiled outside of meteor and placed in `/public/scss` and compiled to `public/css`
* stylesheets and JS libraries are conditionally loaded via `/imports/startup/client/meta.js`

#### 🔹 Pages and Routes
* create new page templates in `/imports/ui/pages/`
* new URL routes need to go `/imports/startup/client/routes.js`

#### 🔹 API & Collections
* collections have their own folder and files in `/imports/api/`
* an example of the format each collections has `/private/app_data.json`
* default data can also be added here and will be entered through functions at `/imports/startup/server/fixtures.js`
* to edit data within the admin, import, subscribe and include it into the restricted templates at `/imports/ui/restricted/`

-------------------

### ✏️ Notes

##### Security and folder structure:
[meteor.com/structure](https://guide.meteor.com/structure.html)

* All files in `/imports/` will not be loaded by default
* All files in any `client/` folder will be available in the browser
* All files in any `server/` folder will only be used on the server
* All files in `/public/` are available as-is, and served up without "public", for example ""
* All files in `/private/` are only accessible from server code and can be loaded via the [Assets API](http://docs.meteor.com/#/full/assets_getText).

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
