import _ from 'lodash';

const step = times => ' '.repeat(times);

const getString = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }
  const objAsString = _
    .keys(value)
    .map(key => `${step(indent + 6)}${key}: ${getString(value[key])}`)
    .join('\n');
  return `{\n${objAsString}\n${step(indent + 2)}}`;
};

const typeActions = {
  nested: (obj, content, indent, fn) => `${step(indent + 2)}${obj.key}: ${fn(obj.children, indent + 4)}`,
  added: (obj, content, indent) => `${step(indent)}+ ${obj.key}: ${content.new}`,
  deleted: (obj, content, indent) => `${step(indent)}- ${obj.key}: ${content.new}`,
  unchanged: (obj, content, indent) => `${step(indent + 2)}${obj.key}: ${content.new}`,
  changed: (obj, content, indent) => [
    `${step(indent)}- ${obj.key}: ${content.old}`, `${step(indent)}+ ${obj.key}: ${content.new}`,
  ],
};

const render = (ast, indent = 2) => {
  const processed = ast
    .map((obj) => {
      const { type, value, valueOld } = obj;
      const content = { old: getString(valueOld, indent), new: getString(value, indent) };
      return typeActions[type](obj, content, indent, render);
    });
  const result = _.flatten(processed).join('\n');
  return `{\n${result}\n${step(indent - 2)}}`;
};
const stringify = ast => `${render(ast)}\n`;

export default stringify;
