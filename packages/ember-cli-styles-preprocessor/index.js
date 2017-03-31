/* eslint-env node */
'use strict';

const Concat = require('broccoli-concat');
const Merge = require('broccoli-merge-trees');
const path = require('path');

const preprocessors = {
  sass: {
    broccoliPlugin: 'broccoli-sass-source-maps',
    options: {
      sourceMap: true,
    },
  },
  scss: {
    broccoliPlugin: 'broccoli-sass-source-maps',
    options: {
      sourceMap: true,
    },
  },
  less: {
    broccoliPlugin: 'broccoli-less-single',
    options: {
      sourceMap: true,
    },
  },
  styl: {
    broccoliPlugin: 'broccoli-stylus-single',
    options: {
      sourceMap: true,
    },
  },
  css: {
    broccoliPlugin: 'broccoli-postcss-single',
    options: [{
      module: require('postcss-import'),
    }],
  },
};

function preprocess(node, type, inputPath, outputPaths) {
  return Object.keys(preprocessors).map(function(extention) {
    let filePath = path.join(inputPath, `${type}.${extention}`);
    let fileOut = `${outputPaths[type]}.${extention}`;
    let precompileOptions = preprocessors[extention].options;

    return new require(preprocessors[extention].broccoliPlugin)([node], filePath, fileOut, precompileOptions);
  });
}

module.exports = {
  setupPreprocessorRegistry: function(type, registry) {
    registry.add('css', {
      name: 'ember-cli-styles-preprocessor',
      ext: Object.keys(preprocessors),
      toTree: function(node, inputPath, outputPath, { outputPaths }) {
        for (type in outputPaths) {

          let preprocessedNodes = new Merge(preprocess(node, type, inputPath, outputPaths));

          let inputFiles = path.join(outputPaths[type] + '.{' + this.ext + '}').split(path.sep).filter(Boolean).join(path.sep);

          return new Concat(preprocessedNodes, {
            outputFile: outputPaths[type],
            inputFiles: [inputFiles],
            sourceMapConfig: { enabled: true },
            allowNone: true
          });
        }
      }
    });
  },

  name: 'ember-cli-styles-preprocessor'
};
