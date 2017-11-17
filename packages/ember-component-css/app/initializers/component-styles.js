import Ember from 'ember';
import podNames from 'ember-component-css/pod-names';
import StyleNamespacingExtras from '../mixins/style-namespacing-extras';

const {
  Component,
  ComponentLookup,
  computed,
  computed: {
    // deprecatingAlias,
    alias,
  },
  getOwner
} = Ember;

ComponentLookup.reopen({
  componentFor(name, owner) {
    owner = owner.hasRegistration ? owner : getOwner(this);

    if (podNames[name] && !owner.hasRegistration(`component:${name}`)) {
      owner.register(`component:${name}`, Component);
    }
    return this._super(...arguments);
  }
});

Component.reopen(StyleNamespacingExtras, {
  styleNamespace: computed({
    get() {
      return podNames[this.get('_componentIdentifier')] || '';
    }
  }),

  // componentCssClassName: deprecatingAlias('styleNamespace', {
  //   id: 'ember-component-css.deprecate-componentCssClassName',
  //   until: '0.7.0',
  // }),

  componentCssClassName: alias('styleNamespace'),

  init() {
    this._super(...arguments);

    if (this.get('_shouldAddNamespacedClassName')) {
      this.classNames = this.classNames.concat(this.get('styleNamespace'));
    }
  }
});

export function initialize() {}

export default {
  name: 'component-styles',
  initialize
};
