const STYLE_EXTENSION_REGEX = /\.(css|less|scss|sass|styl)$/;

function formatFullName(stylePath) {
  return stylePath
    .replace(/(\/(styles?|index))?\.(css|less|scss|sass|styl)$/, '')
    .replace(/.*?\//, '')
    .replace(/^components\//, '');
}

export function generateDefaultStyleNamespaceManifest(owner, styleExtensions) {
  return styleExtensions.reduce(function (styleManifest, extention) {
    owner
      .lookup('container-debug-adapter:main')
      .catalogEntriesByType(extention)
      .forEach(function (stylePath) {
        if (STYLE_EXTENSION_REGEX.test(stylePath)) {
          // eslint-disable-next-line no-undef
          styleManifest[formatFullName(stylePath)] = require(stylePath).default.styleNamespace;
        }
      });

    return styleManifest;
  }, {});
}
