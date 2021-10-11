const path = require('path');
const componentNames = require('./component-names.js');

function getArguments(moduleName) {
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

function addArguments(builders) {
  return ({ param, type, value }) =>
    builders.pair(param, builders[type](value));
}

function addNamespaceArguments(node, moduleName, builders) {
  if (node.path.original !== 'style-namespace') return;

  const allArguments = getArguments(moduleName);
  const neededArguments = allArguments.filter(
    (argument) => !node.hash.pairs.find((pair) => pair.key === argument.param)
  );

  node.hash.pairs.push(...neededArguments.map(addArguments(builders)));
}

function namespaceHelperAstPlugin({
  syntax: { builders },
  meta: { moduleName } = {},
}) {
  return {
    name: 'namespace-helper-ast-plugin',

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

module.exports.NamespaceHelperAst = class NamespaceHelperAst {
  get name() {
    return 'namespace-helper';
  }

  plugin() {
    return namespaceHelperAstPlugin(...arguments);
  }

  baseDir() {
    return path.join('..', __dirname);
  }

  cacheKey() {
    return getArguments('cache-key')
      .map((argument) => argument.value)
      .join('');
  }
};
