import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import styleForSetup from 'dummy/tests/setup/style-for';

module(`Acceptance | Unique Paths`, function (hooks) {
  setupApplicationTest(hooks);
  styleForSetup(hooks);

  test('base rule followed', async function (assert) {
    await visit(`/unique-component-paths`);

    assert.strictEqual(this.styleFor('h1').color, 'rgb(0, 0, 14)');
  });
});
