'use strict';

const path = require('path');

const Concat = require('broccoli-concat');
const Merge = require('broccoli-merge-trees');
const WriteFile = require('broccoli-file-creator');

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

    return new Merge(styles);
  }

  preprocess({ node, inFile, outFile }) {
    const preprocessedNodes = this.preprocessNode(node, inFile, outFile);
    return this.concatStyleFiles(new Merge(preprocessedNodes), outFile);
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

      return new broccoliPlugin([nodeToPreprocess], fileIn, fileOut, options);
    });
  }

  ensureFile(fileIn, node) {
    const newFile = WriteFile(fileIn, '');

    return new Merge([newFile, node], {
      overwrite: true
    });
  }

  concatStyleFiles(preprocessedNode, outFile) {
    return new Concat(preprocessedNode, {
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
