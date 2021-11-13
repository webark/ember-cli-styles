'use strict';

const Preprocessor = require('./lib/preprocessor');
const PREPROCESSORS = require('./lib/preprocessors');

module.exports = {
  _defaultOptions() {
    return {};
  },

  _overrideOptions({ app: { options = {} } }) {
    return {
      ...options.emberCliStylesOptions,
    };
  },

  _options(registry) {
    return {
      ...this._defaultOptions(),
      ...this._overrideOptions(registry),
    };
  },

  setupPreprocessorRegistry(type, registry) {
    const options = this._options(registry);
    const preprocessors = Object.assign(
      {},
      PREPROCESSORS,
      options.preprocessors
    );
    registry.add('css', new Preprocessor(preprocessors));
  },

  name: require('./package').name,
};
