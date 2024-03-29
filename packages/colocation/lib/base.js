const funnel = require('broccoli-funnel');

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

    return funnel(baseFiles, {
      include: [`**/*.{${this.extentions},}`],
      exclude: [`**/styles/**/*`],
      allowEmpty: true,
      annotation: 'Funnel (ember-cli-styles-colocation grab files addon style files)',
    });
  }
};
