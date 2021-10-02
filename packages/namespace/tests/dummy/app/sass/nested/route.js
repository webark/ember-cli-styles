import Route from '@ember/routing/route';
import { later } from '@ember/runloop';

export default class extends Route {
  model() {
    return new Promise((resolve) => later(resolve, 500));
  }
}
