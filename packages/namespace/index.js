'use strict';

const {
  NamespaceStyles,
  ColocatedNamespaceObjects,
} = require('./lib/namespace.js');

const { NamespaceHelperAst } = require('./lib/namespace-helper-ast');

module.exports = {
  _defaultOptions(registry) {
    return {
      terseClassNames: false,
      baseName: registry.app.name,
      getCssExtentions: registry.extensionsForType.bind(registry, 'css'),
    };
  },

  _overrideOptions({ app: { options = {} } }) {
    return {
      terseClassNames: options.enviroment,
      ...options.emberCliStylesOptions,
    };
  },

  _options(registry) {
    return {
      ...this._defaultOptions(registry),
      ...this._overrideOptions(registry),
    };
  },

  setupPreprocessorRegistry(type, registry) {
    const options = this._options(registry);

    registry.add('css', new NamespaceStyles(options));
    registry.add('js', new ColocatedNamespaceObjects(options));

    registry.add('htmlbars-ast-plugin', new NamespaceHelperAst());
  },

  name: require('./package').name,
};
