/* eslint-disable ember/require-tagless-components */
/* eslint-disable ember/no-classic-classes */
/* eslint-disable ember/no-classic-components */

import Component from '@ember/component';
import { styleNamespace } from './generic.scss';

export default Component.extend({
  styleNamespace: styleNamespace,
  classNameBindings: ['styleNamespace'],
});
