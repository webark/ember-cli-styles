'use strict';

const Preprocessor = require('./lib/preprocessor');
const PREPROCESSORS = require('./lib/preprocessors');

module.exports = {
  setupPreprocessorRegistry(type, registry) {
    registry.add('css', new Preprocessor(PREPROCESSORS));
  },

  name: require('./package').name
};
