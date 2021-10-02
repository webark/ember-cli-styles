'use strict';

const path = require('path');

const concat = require('broccoli-concat');
const merge = require('broccoli-merge-trees');
const witeFile = require('broccoli-file-creator');

module.exports = class Preprocessors {
  constructor(preprocessors) {
    this.preprocessors = preprocessors;
    this.ext = this.extensions;
  }

  get name() {
    return 'ember-cli-styles-preprocessor';
  }

  get extensions() {
    if (!this._extentions) {
      this._extentions = Object.keys(this.preprocessors);
    }
    return this._extentions;
  }

  toTree(node, inputPath, outputPath, options) {
    const styles = [];

    for (const [project, outFile] of Object.entries(options.outputPaths)) {
      styles.push(this.preprocess({
        node,
        outFile,
        inFile: path.join(inputPath, project),
      }));
    }

    return merge(styles);
  }

  preprocess({ node, inFile, outFile }) {
    const preprocessedNodes = this.preprocessNode(node, inFile, outFile);
    return this.concatStyleFiles(merge(preprocessedNodes), outFile);
  }

  preprocessNode(node, inFile, outFile)  {
    return this.extensions.map(extention => {
      const {
        broccoliPlugin,
        options,
      } = this.preprocessors[extention];

      const fileIn = `${inFile}.${extention}`;
      const fileOut = `${outFile}.${extention}`;

      const nodeToPreprocess = this.ensureFile(fileIn, node);
      return broccoliPlugin([nodeToPreprocess], fileIn, fileOut, options);
    });
  }

  ensureFile(fileIn, node) {
    const newFile = witeFile(fileIn, '/* Empty File. If know how to conditionaly run broccoli plugins, please reach out. Thanks. */');

    return merge([newFile, node], {
      overwrite: true
    });
  }

  concatStyleFiles(preprocessedNode, outFile) {
    return concat(preprocessedNode, {
      outputFile: outFile,
      inputFiles: [this.styleFiles(outFile)],
      sourceMapConfig: {
        enabled: false,
        extensions: ['css']
      },
      allowNone: true
    })
  }

  styleFiles(outFile) {
    return path.join(`${outFile}.{${this.extensions.join(',')},}`)
      .split(path.sep).filter(Boolean).join(path.sep);
  }
}
