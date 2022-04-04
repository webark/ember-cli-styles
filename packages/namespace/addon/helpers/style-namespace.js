import { getOwner } from '@ember/application';
import Helper from '@ember/component/helper';

export default class StyleNamespace extends Helper {
  compute([componentName], { buildClass, argsClass, runClass }) {
    return this.lookupStyleNamespace(componentName) || argsClass || runClass || buildClass;
  }

  lookupStyleNamespace(componentName) {
    return componentName && getOwner(this).lookup(`style:${componentName}`)?.styleNamespace;
  }
}
