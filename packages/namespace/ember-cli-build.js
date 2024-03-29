'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const preprocessors = require('ember-cli-styles-preprocessor/lib/preprocessors');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
    emberCliStylesOptions: {
      preprocessors,
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
