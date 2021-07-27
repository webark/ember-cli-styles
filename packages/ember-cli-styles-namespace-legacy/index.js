'use strict';

module.exports = {

  _getHostApp() {
    if (!this._findHost) {
      this._findHost = function findHostShim() {
        let current = this;
        let app;
        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
    }

    return this._findHost();
  },

  _getEnvironment() {
    return this._getHostApp().env;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    this.appConfig = app.project.config(this._getEnvironment());
  },

  config(enviroment) {
    return {
      "ember-component-css": {
        terseClassNames: enviroment === 'production',
        namespacing: true,
        classicStyleDir: 'component-styles',
        excludeFromManifest: [],
      },
    };
  },

  name: require('./package').name
};


/*
      "ember-component-css": {
        terseClassNames: enviroment === 'production',
        namespacing: true,
        classicStyleDir: 'component-styles',
        excludeFromManifest: [],
      },

      `terseClassNames` we already have
      namespacing is just including just the colocation package..
      * the legacy will just deregister then namespacing registires
      classic style dir should get added to the colocation
      exclude from mainfest should get added as well


      so this needs to alias the "ember-component-css" settings to "ember-cli-styles"
      after taking "namespacing" off to remove the registers

      needs to copy "ember-styles" file to "pod-styles"

      needs to generate the "pod-names" js file.
*/
