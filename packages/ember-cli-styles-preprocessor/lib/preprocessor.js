'use strict';

const path = require('path');

const Concat = require('broccoli-concat');
const Merge = require('broccoli-merge-trees');
const WriteFile = require('broccoli-file-creator');

module.exports = class Preprocessors {
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
    const preprocessedNode = this.preprocessNode(nodeToProcess, fileToProcess, processedFile);
    return this.concatStyleFiles(preprocessedNode, processedFile);
  }

  preprocessNode(node, inFile, outFile)  {
    return this.extensions.map((extention) => {
      const fileIn = `${inFile}.${extention}`;
      const fileOut = `${outFile}.${extention}`;
      const preprocessor = this.preprocessors[extention];
      const preprocessorOptions = preprocessor.options;

      node = this.ensureFile(fileIn, node);
      return new preprocessor.broccoliPlugin([node], fileIn, fileOut, preprocessorOptions);
    });
  }

  ensureFile(fileIn, node) {
    const newFile = WriteFile(fileIn, '');
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
