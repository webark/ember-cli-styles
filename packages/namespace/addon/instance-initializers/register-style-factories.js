import { generateDefaultStyleNamespaceManifest } from 'ember-cli-styles-namespace/utils/generate-default-style-namespace-manifest';
import { registerStyleFactories } from 'ember-cli-styles-namespace/utils/register-style-factories';

export function initialize(appInstance) {
  const styleNamespaceManfiest = generateDefaultStyleNamespaceManifest(appInstance, [
    'css',
    'less',
    'scss',
    'sass',
    'styl',
  ]);

  registerStyleFactories(appInstance, styleNamespaceManfiest);
}

export default {
  initialize,
};
