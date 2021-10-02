import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class extends Route {
  @service router;

  model() {
    return new Promise.reject();
  }

  @action
  error() {
    this.router.transitionTo('error-state');
  }
}
