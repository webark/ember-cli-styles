'use strict';

const { MoveColocatedStyles, ColocateStyles } = require('./lib/colocate.js');

module.exports = {
  _defaultOptions(app, registry) {
    return {
      baseName: app.name,
      getCssExtentions: registry.extensionsForType.bind(registry, 'css'),
      forceMoveColocatedStyles: this.isAddon(),
    };
  },

  _overrideOptions({ options = {} }) {
    return {
      ...options.emberCliStylesOptions,
    };
  },

  _options(app, registry) {
    return {
      ...this._defaultOptions(app, registry),
      ...this._overrideOptions(app),
    };
  },

  isAddon() {
    return Boolean(this.parent.parent);
  },

  setupPreprocessorRegistry(type, registry) {
    const app = registry.app || this._findHost();

    if (type !== 'parent' || !app) return;

    const options = this._options(app, registry);

    if (options.forceMoveColocatedStyles) {
      this.addStylesHack(app, registry, options);
    }

    registry.add('css', new ColocateStyles(options));
  },

  basePath(app) {
    if (app.trees) {
      return app.trees.app;
    } else if (app.treePaths.addon) {
      return require('path').join(app.root, app.treePaths.addon);
    }
  },

  addStylesHack(app, registry, options) {
    const addonRealDir = this.basePath(app);

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
