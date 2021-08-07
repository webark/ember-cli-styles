'use strict';

const {
  MoveAddonColocatedStyles,
  ColocateStyles,
} = require('./lib/colocate.js');

module.exports = {
  _defaultOptions(registry) {
    return {
      baseName: registry.app.name,
      getCssExtentions: registry.extensionsForType.bind(registry, 'css'),
    };
  },

  _overrideOptions({ options = {} }) {
    return {
      ...options.emberCliStyleOptions,
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

    if (this.isAddon()) {
      this.addAddonStyleHack(registry, options);
    }

    registry.add('css', new ColocateStyles(options));
  },

  addAddonStyleHack(registry, options) {
    const addonRealDir = require('path').join(registry.app.root, registry.app.treePaths.addon);

    registry.add('css', new MoveAddonColocatedStyles({
      addonRealDir,
      ...options,
    }));
  },

  name: require('./package').name
};
