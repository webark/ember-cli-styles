/* eslint-env node */
'use strict';

const Merge = require('broccoli-merge-trees');
const path = require('path');

const Preprocessor = require('./lib/preprocessor');
const PREPROCESSORS = require('./lib/preprocessors');

const preprocessor = new Preprocessor(PREPROCESSORS);

module.exports = {

  setupPreprocessorRegistry(type, registry) {
    registry.add('css', {
      name: 'ember-cli-styles-preprocessor',
      ext: preprocessor.extensions,
      toTree(node, inputPath, outputPath, { outputPaths }) {
        let styles = [];
        for (let project in outputPaths) {
          styles.push(preprocessor.preprocess({
            nodeToProcess: node,
            fileToProcess: path.join(inputPath, project),
            processedFile: outputPaths[project],
          }));
        }
        return new Merge(styles);
      },
    });
  },

  name: 'ember-cli-styles-preprocessor'
};
