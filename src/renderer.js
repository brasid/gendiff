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
  added: (obj, content, indent) => `${step(indent)}+ ${obj.key}: ${content}`,
  deleted: (obj, content, indent) => `${step(indent)}- ${obj.key}: ${content}`,
  unchanged: (obj, content, indent) => `${step(indent + 2)}${obj.key}: ${content}`,
  changed: (obj, content, indent) => (
    `${step(indent)}- ${obj.key}: ${content.old}\n${step(indent)}+ ${obj.key}: ${content.new}`
  ),
};

const render = (ast, indent = 2) => {
  const result = ast.map((obj) => {
    const { type } = obj;
    const content = type === 'changed'
      ? { old: getString(obj.valueOld, indent), new: getString(obj.value, indent) }
      : getString(obj.value, indent);
    return typeActions[type](obj, content, indent, render);
  }).join('\n');
  return `{\n${result}\n${step(indent - 2)}}`;
};
const stringify = ast => `${render(ast)}\n`;

export default stringify;
