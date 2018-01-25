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

  get extensions() {
    return Object.keys(this.preprocessors);
  }

  preprocess({
    nodeToProcess,
    fileToProcess,
    processedFile,
  }) {
    let preprocessedNode =
      this.preprocessNode(nodeToProcess, fileToProcess, processedFile);
    return this.concatStyleFiles(preprocessedNode, processedFile);
  }

  preprocessNode(node, inFile, outFile)  {
    return this.extensions.map((extention) => {
      let fileIn = `${inFile}.${extention}`;
      let fileOut = `${outFile}.${extention}`;
      let preprocessor = this.preprocessors[extention];
      let preprocessorOptions = preprocessor.options;

      node = this.ensureFile(fileIn, node);
      return new require(preprocessor.broccoliPlugin)([node], fileIn, fileOut, preprocessorOptions);
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
      sourceMapConfig: {
        enabled: true,
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

module.exports = Preprocessors
