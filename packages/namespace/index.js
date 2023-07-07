'use strict';

const { NamespaceStyles, ColocatedNamespaceObjects } = require('./lib/namespace.js');

const { NamespaceHelperAst } = require('./lib/namespace-helper-ast');

module.exports = {
  _defaultOptions(app, registry) {
    return {
      terseClassNames: false,
      baseName: app.name,
      getCssExtentions: registry.extensionsForType.bind(registry, 'css'),
    };
  },

  _overrideOptions({ options = {} }) {
    return {
      terseClassNames: options.enviroment,
      ...options.emberCliStylesOptions,
    };
  },

  _options(app, registry) {
    return {
      ...this._defaultOptions(app, registry),
      ...this._overrideOptions(app),
    };
  },

  setupPreprocessorRegistry(type, registry) {
    const app = registry.app || this._findHost();

    if (type !== 'parent' || !app) return;

    const options = this._options(app, registry);

    registry.add('css', new NamespaceStyles(options));
    registry.add('js', new ColocatedNamespaceObjects(options));

    registry.add('htmlbars-ast-plugin', new NamespaceHelperAst());
  },

  name: require('./package').name,
};
