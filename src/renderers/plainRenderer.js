import _ from 'lodash';

const getString = value => (typeof value === 'string' ? `'${value}'` : `${value}`);

const getContent = value => (_.isObject(value) ? '[complex value]' : getString(value));

const typeActions = {
  changed: (name, content, acc) => [...acc, `Property '${name}' was updated. From ${content.old} to ${content.new}`],
  deleted: (name, content, acc) => [...acc, `Property '${name}' was removed`],
  added: (name, content, acc) => [...acc, `Property '${name}' was added with value: ${content.new}`],
  nested: (name, content, acc, children, fn) => [...acc, fn(children, name)],
  unchanged: (name, content, acc) => acc,
};

const render = (ast, ancestry = '') => {
  const processed = ast
    .reduce((acc, obj) => {
      const {
        type, value, valueOld, children,
      } = obj;
      const content = { old: getContent(valueOld), new: getContent(value) };
      const name = ancestry.length > 0 ? `${ancestry}.${obj.key}` : `${obj.key}`;
      return typeActions[type](name, content, acc, children, render);
    }, []);
  return processed.join('\n');
};
export default ast => `${render(ast)}\n`;
