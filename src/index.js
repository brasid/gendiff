import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const propertyActions = [
  {
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    name: (obj1, obj2, key) => `  + ${key}: ${obj2[key]}`,
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    name: (obj1, obj2, key) => `  - ${key}: ${obj1[key]}`,
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    name: (obj1, obj2, key) => `    ${key}: ${obj2[key]}`,
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    name: (obj1, obj2, key) => `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`,
  },
];

const getPropertyAction = (obj1, obj2, key) => _
  .find(propertyActions, ({ check }) => check(obj1, obj2, key));

const makeAst = (obj1, obj2) => _
  .union(_.keys(obj1), _.keys(obj2))
  .map(key => getPropertyAction(obj1, obj2, key).name(obj1, obj2, key));

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

const parse = (obj, ext) => parsers[ext](obj);

const getDiff = (pathToBefore, pathToAfter) => {
  const before = fs.readFileSync(pathToBefore, 'utf-8');
  const after = fs.readFileSync(pathToAfter, 'utf-8');
  const ext1 = path.extname(pathToBefore);
  const ext2 = path.extname(pathToAfter);
  const obj1 = parse(ext1, before);
  const obj2 = parse(ext2, after);
  const resultLine = makeAst(obj1, obj2).join('\n');
  return ['{', resultLine, '}\n'].join('\n');
};

export default getDiff;
