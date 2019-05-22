'use strict';

module.exports = {
  sass: {
    broccoliPlugin: require('broccoli-sass-source-maps')(require('sass')),
    options: {
      sourceMap: true,
      sourceMapEmbed: true,
      fiber: require('fibers'),
    },
  },
  scss: {
    broccoliPlugin: require('broccoli-sass-source-maps')(require('sass')),
    options: {
      sourceMap: true,
      sourceMapEmbed: true,
      fiber: require('fibers'),
    },
  },
  less: {
    broccoliPlugin: require('broccoli-less-single'),
    options: {
      sourceMap: true,
    },
  },
  styl: {
    broccoliPlugin: require('broccoli-stylus-single'),
    options: {
      sourceMap: true,
    },
  },
  css: {
    broccoliPlugin: require('broccoli-postcss-single'),
    options: {
      plugins: [{
        module: require('postcss-import'),
      }],
      map: true,
    },
  },
};
