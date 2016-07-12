/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {

  setupPreprocessorRegistry: function(type, registry) {
    console.log(type);
    registry.remove('css', 'broccoli-less-single');
    registry.remove('css', 'broccoli-sass-source-maps');
    registry.remove('css', 'broccoli-stylus-single', 'styl');
    registry.add('css', {
      name: 'css-preprocess-stylus',
      ext: 'styl',
      toTree: function(tree, inputPath, outputPath, options) {
        var Preprocessor = require('broccoli-stylus-single');
        var input = path.join(inputPath, 'app' + '.' + this.ext);
        var output = options.outputPaths.app + '.' + this.ext;
        var preprocessedFiles = new Preprocessor([tree], input, output, options);
        return new Merge([tree, preprocessedFiles]);
      },
    });
    registry.add('css', {
      name: 'css-preprocess-less',
      ext: 'less',
      toTree: function(tree, inputPath, outputPath, options) {
        var Preprocessor = require('broccoli-less-single');
        var input = path.join(inputPath, 'app' + '.' + this.ext);
        var output = options.outputPaths.app + '.' + this.ext;
        var preprocessedFiles = new Preprocessor([tree], input, output, options);
        return new Merge([tree, preprocessedFiles]);
      },
    });
    registry.add('css', {
      name: 'css-preprocess-sass',
      ext: ['scss', 'sass'],
      toTree: function(tree, inputPath, outputPath, options) {
        var Preprocessor = require('broccoli-sass-source-maps');
        var input = path.join(inputPath, 'app' + '.' + this.ext[0]);
        var output = options.outputPaths.app + '.' + this.ext[0];
        var preprocessedFiles = new Preprocessor([tree], input, output, options);
        return new Merge([tree, preprocessedFiles]);
      },
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
