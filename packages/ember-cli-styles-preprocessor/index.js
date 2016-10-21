/* jshint node: true */
'use strict';

var Concat = require('broccoli-concat');
var Merge = require('broccoli-merge-trees');
var Filter = require('broccoli-persistent-filter');
var Funnel = require('broccoli-funnel');

var preprocessors = {
  sass: 'broccoli-sass-source-maps',
  scss: 'broccoli-sass-source-maps',
  less: 'broccoli-less-single',
  styl: 'broccoli-stylus-single'
};

module.exports = {

  setupPreprocessorRegistry: function(type, registry) {
    registry.add('css', {
      name: 'ember-cli-css-extensions',
      ext: Object.keys(preprocessors),
      toTree: function(tree, inputPath, outputPath, options) {
        for (type in options.outputPaths) {
          var input = inputPath.slice(1);
          input = input ? input + '/' : input;

          var allRees = Object.keys(preprocessors).map(function(extention) {
            var filePath = input + type + '.' + extention;
            var fileOut = options.outputPaths[type] + '.' + extention;
            options = options || {};
            options.sourceMap = true;

            return new require(preprocessors[extention])([tree], filePath, fileOut, options);
          });
          allRees = new Merge(allRees);

          var inputFiles = options.outputPaths[type] + '.{' + Object.keys(preprocessors) + '}';
          inputFiles = /^\//.test(inputFiles) ? inputFiles.slice(1) : inputFiles;

          var node = new Concat(allRees, {
            outputFile: options.outputPaths[type],
            inputFiles: [inputFiles],
            sourceMapConfig: { enabled: true },
            allowNone: true
          });
        }
        return new Merge([node, tree]);
      }
    });
  },

  name: 'ember-cli-css-extensions'
};
