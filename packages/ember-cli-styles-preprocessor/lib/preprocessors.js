/* eslint-env node */
'use strict';

module.exports = {
  sass: {
    broccoliPlugin: 'broccoli-sass-source-maps',
    options: {
      sourceMap: true,
      sourceMapEmbed: true,
    },
  },
  scss: {
    broccoliPlugin: 'broccoli-sass-source-maps',
    options: {
      sourceMap: true,
      sourceMapEmbed: true,
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
