'use strict';

const { MoveColocatedStyles, ColocateStyles } = require('./lib/colocate.js');

module.exports = {
  _defaultOptions(registry) {
    return {
      baseName: registry.app.name,
      getCssExtentions: registry.extensionsForType.bind(registry, 'css'),
      forceMoveColocatedStyles: this.isAddon(),
    };
  },

  _overrideOptions({ app: { options = {} } }) {
    return {
      ...options.emberCliStylesOptions,
    };
  },

  _options(registry) {
    return {
      ...this._defaultOptions(registry),
      ...this._overrideOptions(registry),
    };
  },

  isAddon() {
    return Boolean(this.parent.parent);
  },

  setupPreprocessorRegistry(type, registry) {
    const options = this._options(registry);

    if (options.forceMoveColocatedStyles) {
      this.addStylesHack(registry, options);
    }

    registry.add('css', new ColocateStyles(options));
  },

  basePath(registry) {
    if (registry.app.trees) {
      return registry.app.trees.app;
    } else if (registry.app.treePaths.addon) {
      return require('path').join(registry.app.root, registry.app.treePaths.addon);
    }
  },

  addStylesHack(registry, options) {
    const addonRealDir = this.basePath(registry);

    registry.add(
      'css',
      new MoveColocatedStyles({
        addonRealDir,
        ...options,
      })
    );
  },

  name: require('./package').name,
};
