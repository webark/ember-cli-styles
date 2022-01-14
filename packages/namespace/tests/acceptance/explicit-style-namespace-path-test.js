import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import styleForSetup from 'dummy/tests/setup/style-for';

module(`Acceptance | Explicit Style Namespace Path`, function (hooks) {
  setupApplicationTest(hooks);
  styleForSetup(hooks);

  test('can pass an explicit path', async function (assert) {
    await visit(`/explicit-style-namespace-path`);

    assert.strictEqual(this.styleFor('h1').color, 'rgb(0, 0, 15)');
  });
});
