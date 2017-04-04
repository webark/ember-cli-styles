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

  toTree(node, inputPath, outputPath, { outputPaths }) {
    let styles = [];
    for (let project in outputPaths) {
      let infile = path.join(inputPath, project);
      let outfile = outputPaths[project];
      styles.push(this.handleProject(node, infile, outfile));
    }
    return new Merge(styles);
  }

  handleProject(node, inFile, outFile) {
    let preprocessedNode = this.preprocessNodes(...arguments);
    return this.singleStyle(preprocessedNode, outFile);
  }

  preprocessNodes(node, inFile, outFile)  {
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

  singleStyle(preprocessedNode, outFile) {
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
