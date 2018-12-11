import _ from 'lodash';
import fs from 'fs';


const propertyActions = [
  {
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    name: (obj1, obj2, key) => `\n  + ${key}: ${obj2[key]}`,
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    name: (obj1, obj2, key) => `\n  - ${key}: ${obj1[key]}`,
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    name: (obj1, obj2, key) => `\n    ${key}: ${obj2[key]}`,
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    name: (obj1, obj2, key) => `\n  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`,
  },
];

const getPropertyAction = (obj1, obj2, key) => _
  .find(propertyActions, ({ check }) => check(obj1, obj2, key));

const getDiff = (pathToBefore, pathToAfter) => {
  const before = fs.readFileSync(pathToBefore, 'utf-8');
  const after = fs.readFileSync(pathToAfter, 'utf-8');
  const obj1 = JSON.parse(before); // first element will be base element
  const obj2 = JSON.parse(after); // second element will be new element
  const keys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const resultLine = keys
    .reduce((acc, current) => (acc.includes(current) ? acc : acc.concat(current)), [])
    .map(key => getPropertyAction(obj1, obj2, key).name(obj1, obj2, key))
    .join('');
  return ['{', ...resultLine, '\n}\n'].join('');
};

export default getDiff;
