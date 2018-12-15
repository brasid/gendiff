import fs from 'fs';
import genDiff from '../src';

const extNames = ['.json', '.yml', '.ini'];
const plainNames = ['./__tests__/__fixtures__/before', './__tests__/__fixtures__/after'];
const nestedNames = ['./__tests__/__fixtures__/beforeNested', './__tests__/__fixtures__/afterNested'];

const getCartesianFiles = (exts, names) => exts.map(ext => names.map(name => [ext, name].join('')));

const getCartesianTests = (beforeArr, afterArr, expected) => beforeArr.map(
  (before, indexBefore) => afterArr.map(
    (after, indexAfter) => it(`set${indexBefore}.${indexAfter}`, () => {
      const actual = genDiff(before, after);
      expect(actual).toBe(expected);
    }),
  ),
);

describe('PlainFiles', () => {
  const plainFiles = getCartesianFiles(plainNames, extNames);
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected', 'utf-8');
  const beforeArr = plainFiles[0];
  const afterArr = plainFiles[1];
  return getCartesianTests(beforeArr, afterArr, expected);
});

describe('NestedFiles', () => {
  const nestedFiles = getCartesianFiles(nestedNames, extNames);
  const expected = fs.readFileSync('./__tests__/__fixtures__/expectNested', 'utf-8');
  const beforeArr = nestedFiles[0];
  const afterArr = nestedFiles[1];
  return getCartesianTests(beforeArr, afterArr, expected);
});
