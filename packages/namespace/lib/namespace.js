const merge = require('broccoli-merge-trees');

const Base = require('ember-cli-styles-colocation/lib/base.js');

const BroccoliNamespaceStyles = require('./namespace-styles.js');
const StyleInfo = require('./style-info.js');

module.exports.NamespaceStyles = class NamespaceStyles extends Base {
  get name() {
    return 'namespace-styles';
  }

  namespaceStyles(tree) {
    return new BroccoliNamespaceStyles(tree, {
      extensions: this.extentions,
      terseClassNames: this.terseClassNames,
      annotation:
        'Filter (ember-component-css process root & or :--component with class name)',
    });
  }

  toTree(tree) {
    const colocatedStyles = this.colocatedStyles(tree);
    const namespaced = this.namespaceStyles(colocatedStyles);

    return merge([tree, namespaced], { overwrite: true });
  }
};

module.exports.ColocatedNamespaceObjects = class ColocatedNamespaceObjects extends (
  Base
) {
  get name() {
    return 'colocate-and-namespace-styles-in-js';
  }

  toTree(tree) {
    const colocatedStyles = this.colocatedStyles(tree);
    const generatedFiles = new StyleInfo(colocatedStyles, {
      terseClassNames: this.terseClassNames,
    });

    return merge([tree, generatedFiles], { overwrite: true });
  }
};
