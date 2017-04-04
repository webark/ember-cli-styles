/* eslint-env node */
'use strict';

const Preprocessor = require('./lib/preprocessor');

const PREPROCESSORS = require('./lib/preprocessors');

module.exports = {
  setupPreprocessorRegistry: function(type, registry) {
    let preprocessor = new Preprocessor(PREPROCESSORS);
    registry.add('css', {
      name: 'ember-cli-styles-preprocessor',
      ext: preprocessor.extentions,
      toTree: preprocessor.toTree.bind(preprocessor),
    });
  },

  name: 'ember-cli-styles-preprocessor'
};
