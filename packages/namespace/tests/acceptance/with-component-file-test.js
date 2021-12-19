import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import styleForSetup from 'dummy/tests/setup/style-for';

module('Acceptance | with component file', function (hooks) {
  setupApplicationTest(hooks);
  styleForSetup(hooks);

  test('should be able import styleNamespace in a glimmer component', async function (assert) {
    await visit('/with-component-file');

    assert.strictEqual(
      this.styleFor(`h3:first-of-type`).color,
      'rgb(255, 0, 0)'
    );
  });

  test('should be able import styleNamespace in a classic component', async function (assert) {
    await visit('/with-component-file');

    assert.strictEqual(
      this.styleFor(`h3:last-of-type`).color,
      'rgb(255, 0, 0)'
    );
  });
});
