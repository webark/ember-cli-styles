import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service router;

  beforeModel(transition) {
    transition.abort();
    this.router.transitionTo('template-style-only');
    return super.beforeModel(...arguments);
  }
}
