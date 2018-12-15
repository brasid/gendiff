import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './renderers';

const propertyActions = [
  {
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])),
    process: (obj1, obj2, key, fn) => ({ type: 'nested', key, children: fn(obj1[key], obj2[key]) }),
  },
  {
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (obj1, obj2, key) => ({ type: 'added', key, value: obj2[key] }),
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: (obj1, obj2, key) => ({ type: 'deleted', key, value: obj1[key] }),
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: (obj1, obj2, key) => ({ type: 'unchanged', key, value: obj1[key] }),
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    process: (obj1, obj2, key) => ({
      type: 'changed', key, oldValue: obj1[key], newValue: obj2[key],
    }),
  },
];
const getPropertyAction = (obj1, obj2, key) => _
  .find(propertyActions, ({ check }) => check(obj1, obj2, key));

const genAst = (obj1, obj2) => _
  .union(_.keys(obj1), _.keys(obj2))
  .map(key => getPropertyAction(obj1, obj2, key).process(obj1, obj2, key, genAst));

const getDiff = (pathToBefore, pathToAfter, outFormat) => {
  const before = fs.readFileSync(pathToBefore, 'utf-8');
  const after = fs.readFileSync(pathToAfter, 'utf-8');
  const ext1 = path.extname(pathToBefore).substring(1);
  const ext2 = path.extname(pathToAfter).substring(1);
  const obj1 = parse(ext1, before);
  const obj2 = parse(ext2, after);
  const ast = genAst(obj1, obj2);
  return render(ast, outFormat);
};

export default getDiff;
