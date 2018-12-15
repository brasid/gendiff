import _ from 'lodash';

const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `${value}`;
};

const typeActions = {
  changed: (obj, name) => `Property '${name}' was updated. From ${stringify(obj.oldValue)} to ${stringify(obj.newValue)}`,
  deleted: (obj, name) => `Property '${name}' was removed`,
  added: (obj, name) => `Property '${name}' was added with value: ${stringify(obj.value)}`,
  nested: (obj, name, fn) => fn(obj.children, `${name}.`),
  unchanged: () => [],
};

const render = (ast, ancestry = '') => {
  const processed = ast
    .map((obj) => {
      const name = `${ancestry}${obj.key}`;
      return typeActions[obj.type](obj, name, render);
    });
  return _.flatten(processed).join('\n');
};
export default ast => `${render(ast)}\n`;
