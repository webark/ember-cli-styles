export function registerStyleFactories(owner, styleNamespaceFileManifest) {
  Object.entries(styleNamespaceFileManifest).forEach(function ([name, styleNamespace]) {
    owner.register(
      `style:${name}`,
      { styleNamespace },
      {
        instantiate: false,
        singleton: true,
      }
    );
  });
}
