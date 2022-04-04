const path = require('path');

const funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');

module.exports = class Base {
  constructor(options) {
    this.getCssExtentions = options.getCssExtentions;
    this.baseName = options.baseName;
  }

  get extentions() {
    return this.getCssExtentions();
  }

  colocatedStyles(tree, srcDir = this.baseName, destDir = this.baseName) {
    const baseFiles = funnel(tree, {
      srcDir,
      destDir,
      allowEmpty: true,
      annotation: 'Funnel (ember-cli-styles-colocation grab files addon style files)',
    });

    const classicStyles = funnel(tree, {
      srcDir: path.join(srcDir, 'styles', 'component-styles'),
      destDir,
      allowEmpty: true,
    });

    return funnel(merge([baseFiles, classicStyles], { overwrite: true }), {
      include: [`**/*.{${this.extentions},}`],
      exclude: [`**/styles/**/*`],
      allowEmpty: true,
      annotation: 'Funnel (ember-cli-styles-colocation grab files addon style files)',
    });
  }
};
