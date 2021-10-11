import { helper } from '@ember/component/helper';

export default helper(function styleNamespace(
  _positional,
  { buildClass, argsClass, runClass }
) {
  return argsClass || runClass || buildClass;
});
