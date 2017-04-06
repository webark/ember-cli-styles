/* eslint-env node */
'use strict';

const Concat = require('broccoli-concat');
const Merge = require('broccoli-merge-trees');
const WriteFile = require('broccoli-file-creator');
const path = require('path');

class Preprocessors {

  constructor(preprocessors) {
    this.preprocessors = preprocessors;
  }

  get extentions() {
    return Object.keys(this.preprocessors);
  }

  preprocess({ nodeToProcess, fileToProcess, processedFile }) {
    let preprocessedNode = this.preprocessNode(nodeToProcess, fileToProcess, processedFile);
    return this.concatStyleFiles(preprocessedNode, processedFile);
  }

  preprocessNode(node, inFile, outFile)  {
    return this.extentions.map((extention) => {
      let fileIn = `${inFile}.${extention}`;
      let fileOut = `${outFile}.${extention}`;
      let preprocessor = this.preprocessors[extention];

      node = this.ensureFile(fileIn, node);
      return new require(preprocessor.broccoliPlugin)([node], fileIn, fileOut, preprocessor.options);
    });
  }

  ensureFile(fileIn, node) {
    let newFile = WriteFile(fileIn, '');
    return new Merge([newFile, node], {
      overwrite: true
    });
  }

  concatStyleFiles(preprocessedNode, outFile) {
    preprocessedNode = new Merge(preprocessedNode);
    return new Concat(preprocessedNode, {
      outputFile: outFile,
      inputFiles: [this.styleFiles(outFile)],
      sourceMapConfig: { enabled: true },
      allowNone: true
    })
  }

  styleFiles(outFile) {
    return path.join(`${outFile}.{${this.extentions.join(',')},}`)
      .split(path.sep).filter(Boolean).join(path.sep);
  }
}

module.exports = Preprocessors
