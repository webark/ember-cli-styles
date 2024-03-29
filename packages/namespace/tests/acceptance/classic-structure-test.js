import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import styleForSetup from 'dummy/tests/setup/style-for';

module.skip('Acceptance | classic structure', function (hooks) {
  setupApplicationTest(hooks);
  styleForSetup(hooks);

  test('should be able to use classic structure style', async function (assert) {
    await visit('/classic-structure');

    const color = this.styleFor('.classic-structure').color;
    assert.strictEqual(color, 'rgb(0, 0, 1)');
  });

  test('should be able to use classic structure style nested', async function (assert) {
    await visit('/classic-structure-nested');

    const color = this.styleFor('.classic-structure-nested').color;
    assert.strictEqual(color, 'rgb(0, 0, 1)');
  });
});
