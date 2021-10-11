const path = require('path');
const componentNames = require('./component-names.js');

function getModifiers(moduleName) {
  return [
    {
      param: 'buildClass',
      type: 'string',
      value: componentNames.class(moduleName),
    },
    {
      param: 'argsClass',
      type: 'path',
      value: '@styleNamespace',
    },
    {
      param: 'runClass',
      type: 'path',
      value: 'this.styleNamespace',
    },
  ];
}

function addModifier(builders) {
  return ({ param, type, value }) =>
    builders.pair(param, builders[type](value));
}

function addNamespaceArguments(node, moduleName, builders) {
  if (node.path.original !== 'style-namespace') return;

  const allModifiers = getModifiers(moduleName);
  const neededModifiers = allModifiers.filter(
    (modifier) => !node.hash.pairs.find((pair) => pair.key === modifier.param)
  );

  node.hash.pairs.push(...neededModifiers.map(addModifier(builders)));
}

function namespaceMofiderAstPlugin({
  syntax: { builders },
  meta: { moduleName } = {},
}) {
  return {
    name: 'namespace-modifier-ast-plugin',

    visitor: {
      SubExpression(node) {
        addNamespaceArguments(node, moduleName, builders);
      },
      MustacheStatement(node) {
        addNamespaceArguments(node, moduleName, builders);
      },
    },
  };
}

module.exports.NamespaceModifierAst = class NamespaceModifierAst {
  get name() {
    return 'namespace-modifier';
  }

  plugin() {
    return namespaceMofiderAstPlugin(...arguments);
  }

  baseDir() {
    return path.join('..', __dirname);
  }

  cacheKey() {
    return getModifiers('cache-key')
      .map((modifier) => modifier.value)
      .join('');
  }
};
