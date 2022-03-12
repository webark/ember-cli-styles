/* eslint-env node */
'use strict';

const preprocessors = require('ember-cli-styles-preprocessor/lib/preprocessors');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon: function () {
    return true;
  },

  options: {
    emberCliStylesOptions: {
      preprocessors,
    },
  },
};
