const md5 = require('md5');
const path = require('path');

module.exports = {
  path(actualPath) {
    const { dir, name } = path.parse(actualPath);

    return path.join(
      dir.replace(/(templates|components)/g, ''),
      name.replace(/(template|component|styles?|index)$/g, '')
    );
  },

  class(actualPath, terseClassNames) {
    const seperator = '__';
    const componentFileStem = this.path(actualPath);
    const className = terseClassNames ? md5(componentFileStem).slice(-5) : componentFileStem.replace(/\//g, seperator);

    return seperator + className;
  },
};
