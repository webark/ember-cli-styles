'use strict';

const Preprocessor = require('./lib/preprocessor');

module.exports = {
  _defaultOptions() {
    return {};
  },

  _overrideOptions({ options = {} }) {
    return {
      ...options.emberCliStylesOptions,
    };
  },

  _options(app) {
    return {
      ...this._defaultOptions(),
      ...this._overrideOptions(app),
    };
  },

  setupPreprocessorRegistry(type, registry) {
    const app = registry.app || this._findHost();

    if (type !== 'parent' || !app) return;

    const options = this._options(app);
    const preprocessors = Object.assign({}, options.preprocessors);
    registry.add('css', new Preprocessor(preprocessors));
  },

  name: require('./package').name,
};
