'use strict';

const path = require('path');

const Funnel = require('broccoli-funnel');

const {
  ColocateStyles,
  NamespaceStyles,
  ColocatedNamespaceObjects,
  ColocatedNamespaceTemplates,
} = require('./lib/colocate-namespace.js');

module.exports = {
  _defaultOptions(enviroment = true) {
    return {
      terseClassNames: enviroment === 'production',
    };
  },

  _options({ options: { emberCliStyles } = {}}) {
    return Object.assign(this._defaultOptions(), emberCliStyles);
  },

  _baseNode(app) {
    if (app.treePaths) {
      return new Funnel(path.join(app.root, app.treePaths.addon));
    } else {
      const appTree = (app.app || app).trees.app;
      if (typeof appTree === 'string') {
        return new Funnel(path.join(app.project.root, appTree));
      } else {
        return appTree;
      }
    }
  },

  setupPreprocessorRegistry(type, registry) {
    const baseNode = this._baseNode(registry.app);
    const { terseClassNames } = this._options(registry.app);

    registry.add('css', new ColocateStyles({
      getExtentions: registry.extensionsForType.bind(registry),
      baseNode,
    }));

    registry.add('css', new NamespaceStyles({
      getExtentions: registry.extensionsForType.bind(registry),
      terseClassNames,
    }));

    registry.add('js', new ColocatedNamespaceObjects({
      getExtentions: registry.extensionsForType.bind(registry),
      baseNode,
    }));

    registry.add('template', new ColocatedNamespaceTemplates({
      terseClassNames,
    }));
  },

  name: require('./package').name
};
