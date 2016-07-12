/* jshint node: true */
'use strict';

var path = require('path');
var Concat = require('broccoli-concat');
var Merge = require('broccoli-merge-trees');

var preprocessors = {
  sass: {
    preprocessor: 'broccoli-sass-source-maps',
    extentions: ['scss', 'sass']
  },
  less: {
    preprocessor: 'broccoli-less-single'
  },
  stylus: {
    preprocessor: 'broccoli-stylus-single',
    extentions: 'styl'
  }
};

module.exports = {

  setupPreprocessorRegistry: function(type, registry) {
    Object.keys(preprocessors).forEach(function(type) {

      var item = preprocessors[type];
      var extentions = item.extentions || type;

      registry.add('css', {
        name: 'css-preprocess-' + type,
        ext: extentions,
        toTree: function(tree, inputPath, outputPath, options) {

          var Preprocessor = require(item.preprocessor);
          var allExtentions = Array.isArray(extentions) ? extentions : [extentions];

          var preprocessedTrees = allExtentions.map(function(extention) {

            var input = path.join(inputPath, 'app' + '.' + extention);
            var output = options.outputPaths.app + '.' + extention;

            return new Preprocessor([tree], input, output, options);
          });

          return new Merge(preprocessedTrees.concat(tree));
        }
      });
    });
  },

  postprocessTree: function(type, tree) {
    if (type === 'css') {
      tree = Concat(tree, {
        outputFile: 'assets/' + this.app.name + '.css',
        inputFiles: ['**/' + this.app.name + '.css.*'],
        sourceMapConfig: { enabled: true },
      });
    }
    return tree;
  },

  name: 'ember-cli-css-extensions'
};
