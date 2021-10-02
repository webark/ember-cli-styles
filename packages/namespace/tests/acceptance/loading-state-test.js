import { visit, click, waitUntil, settled, find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import styleForSetup from 'dummy/tests/setup/style-for';

module('Acceptance | loading state', function (hooks) {
  setupApplicationTest(hooks);
  styleForSetup(hooks);

  // eslint-disable-next-line qunit/require-expect
  test('loading state is styled', async function (assert) {
    await visit('/loading-state/base');
    assert.equal(this.styleFor('h1').color, 'rgb(0, 0, 14)');

    click('a[title=Waiting]');
    await waitUntil(() => find('h2'));
    assert.equal(this.styleFor('h2').color, 'rgb(1, 0, 13)');
    await settled();

    assert.equal(this.styleFor('h3').color, 'rgb(0, 0, 13)');
  });
});
