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



function preprocess(styleNode, infile, outfile) {
  return Object.keys(preprocessors).map(function(extention) {
    let fileIn = `${infile}.${extention}`;
    let fileOut = `${outfile}.${extention}`;
    let preprocessor = preprocessors[extention];
    return new require(preprocessor.broccoliPlugin)([styleNode], fileIn, fileOut, preprocessor.options);
  });
}

module.exports = {
  setupPreprocessorRegistry: function(type, registry) {
    registry.add('css', {
      name: 'ember-cli-styles-preprocessor',
      ext: Object.keys(preprocessors),
      toTree: function(node, inputPath, outputPath, { outputPaths }) {
        let styles = [];
        for (let project in outputPaths) {
          let infile = path.join(inputPath, project);
          let outfile = outputPaths[project];

          let preprocessedNodes = new Merge(preprocess(node, infile, outfile));

          let inputFiles = path.join(outfile + '.{' + this.ext.join(',') + ',}').split(path.sep).filter(Boolean).join(path.sep);

          styles.push(new Concat(preprocessedNodes, {
            outputFile: outfile,
            inputFiles: [inputFiles],
            sourceMapConfig: { enabled: true },
            allowNone: true
          }));
        }

        return new Merge(styles);
      }
    });
  },

  name: 'ember-cli-styles-preprocessor'
};
