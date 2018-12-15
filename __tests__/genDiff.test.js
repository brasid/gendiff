import fs from 'fs';
import genDiff from '../src';

const extNames = ['.json', '.yml', '.ini'];
const plainNames = ['./__tests__/__fixtures__/before', './__tests__/__fixtures__/after'];
const nestedNames = ['./__tests__/__fixtures__/beforeNested', './__tests__/__fixtures__/afterNested'];

const getCartesianFiles = (exts, names) => exts.map(ext => names.map(name => [ext, name].join('')));

const getCartesianTests = (beforeArr, afterArr, expected, format) => beforeArr.map(
  (before, indexBefore) => afterArr.map(
    (after, indexAfter) => it(`set${indexBefore}.${indexAfter}`, () => {
      const actual = genDiff(before, after, format);
      expect(actual).toBe(expected);
    }),
  ),
);

describe('SimpleFiles -f standart', () => {
  const plainFiles = getCartesianFiles(plainNames, extNames);
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected', 'utf-8');
  const beforeArr = plainFiles[0];
  const afterArr = plainFiles[1];
  const format = 'standart';
  getCartesianTests(beforeArr, afterArr, expected, format);
});

describe('NestedFiles -f standart', () => {
  const nestedFiles = getCartesianFiles(nestedNames, extNames);
  const expected = fs.readFileSync('./__tests__/__fixtures__/expectNested', 'utf-8');
  const beforeArr = nestedFiles[0];
  const afterArr = nestedFiles[1];
  const format = 'standart';
  getCartesianTests(beforeArr, afterArr, expected, format);
});

describe('NestedFiles -f plain', () => {
  const nestedFiles = getCartesianFiles(nestedNames, extNames);
  const expected = fs.readFileSync('./__tests__/__fixtures__/expectPlain', 'utf-8');
  const beforeArr = nestedFiles[0];
  const afterArr = nestedFiles[1];
  const format = 'plain';
  getCartesianTests(beforeArr, afterArr, expected, format);
});
