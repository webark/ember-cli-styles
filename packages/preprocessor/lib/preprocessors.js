'use strict';

module.exports = {
  sass: {
    broccoliPlugin: require('broccoli-sass-source-maps')(require('sass')),
    options: {
      sourceMap: true,
      sourceMapEmbed: true,
    },
  },
  scss: {
    broccoliPlugin: require('broccoli-sass-source-maps')(require('sass')),
    options: {
      sourceMap: true,
      sourceMapEmbed: true,
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
      map: true,
      plugins: [
        {
          module: require('postcss-import'),
        },
        {
          module: require('postcss-preset-env'),
          options: { stage: 3 },
        },
      ],
    },
  },
};
