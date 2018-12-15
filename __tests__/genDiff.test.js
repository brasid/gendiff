import fs from 'fs';
import genDiff from '../src';

const exts = ['.json', '.yml', '.ini'];
const names = ['./__tests__/__fixtures__/beforeNested', './__tests__/__fixtures__/afterNested'];

const filePaths = names.map(name => exts.map(ext => [name, ext].join('')));

const beforeArr = filePaths[0];
const afterArr = filePaths[1];

const getCartesianTests = (expected, format) => beforeArr.forEach(
  (before, indexBefore) => afterArr.forEach(
    (after, indexAfter) => it(`set${indexBefore}.${indexAfter}`, () => {
      const actual = genDiff(before, after, format);
      expect(actual).toBe(expected);
    }),
  ),
);

describe('Check standart renderer', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expectNested', 'utf-8');
  const format = 'standart';
  getCartesianTests(expected, format);
});

describe('Check plain renderer', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expectPlain', 'utf-8');
  const format = 'plain';
  getCartesianTests(expected, format);
});

describe('Check json renderer', () => {
  it('set1', () => {
    const expected = fs.readFileSync('./__tests__/__fixtures__/expectJSON.json', 'utf-8');
    const before = './__tests__/__fixtures__/beforeNested.json';
    const after = './__tests__/__fixtures__/afterNested.yml';
    const actual = genDiff(before, after, 'json');
    expect(actual).toBe(expected);
  });
});
