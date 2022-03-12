ember-cli-styles-preprocessor
==============================================================================

Allows for one or many style preprocessors to be used for a given addon or app.


Compatibility
------------------------------------------------------------------------------

* Ember.js v4.0 or above
* Ember CLI v4.0 or above
* Node.js v16 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-styles-preprocessor
```


Usage
------------------------------------------------------------------------------

In order to preprocess styles, you must define them manually.
This can be done either in the `ember-cli-build.js` file of an app as,

```javascript
const preprocessors = {
  scss: {
    broccoliPlugin: require('broccoli-sass-source-maps')(require('sass')),
    options: {
      sourceMap: true,
      sourceMapEmbed: true,
    },
  },
};

let app = new EmberApp(defaults, {
  ...
  emberCliStylesOptions: {
    preprocessors,
  },
  ...
});
```

or in the index.js of an addon like

```javascript
const preprocessors = {
  scss: {
    broccoliPlugin: require('broccoli-sass-source-maps')(require('sass')),
    options: {
      sourceMap: true,
      sourceMapEmbed: true,
    },
  },
};

module.exports = {
  ...
  options: {
    ...
    emberCliStylesOptions: {
      preprocessors,
    },
    ...
  },
  ...
};

```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
