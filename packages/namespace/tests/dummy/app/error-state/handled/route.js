import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  router: service(),
  model() {
    return new RSVP.Promise.reject();
  },

  actions: {
    error() {
      this.router.transitionTo('error-state');
    },
  },
});
