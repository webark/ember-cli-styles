const funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');
const manifest = require('broccoli-file-manifest');

const Base = require('./base.js');

module.exports.MoveColocatedStyles = class MoveColocatedStyles extends Base {
  constructor(options) {
    super(options);
    this.addonRealDir = options.addonRealDir;
  }

  get name() {
    return 'move-addon-colocated-styles';
  }

  toTree(tree) {
    const colocatedStyles = this.colocatedStyles(this.addonRealDir, '');

    return merge([tree, colocatedStyles], { overwrite: true });
  }
};

const MANIFEST_TEMPATES = {
  default: '@import "<file-path>";',
  sass: '@import "<file-path>"',
  styl: '@import "<file-path>"',
  css: '@import "../../<file-path>";',
};

module.exports.ColocateStyles = class ColocateStyles extends Base {
  constructor(options) {
    super(options);
    this.manifestTemplates = Object.assign({}, MANIFEST_TEMPATES, options.manifestTemplates);
  }

  get name() {
    return 'colocate-styles';
  }

  generateManifest(tree, destDir) {
    const manifesto = manifest(tree, {
      outputFileNameWithoutExtension: 'ember-styles',
      templates: this.manifestTemplates,
      annotation: 'Manifest (ember-component-css style file manifest)',
    });

    return funnel(manifesto, {
      destDir,
    });
  }

  toTree(tree, destDir) {
    const colocatedStyles = this.colocatedStyles(tree);
    const manifests = this.generateManifest(colocatedStyles, destDir);

    return merge([tree, manifests], { overwrite: true });
  }
};
