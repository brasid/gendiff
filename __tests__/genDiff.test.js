import fs from 'fs';
import genDiff from '../src';

const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const extNames = ['.json', '.yml', '.ini'];

const getExtName = (num1, num2) => extNames[getRandomNum(num1, num2)];

test('PlainFiles', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected', 'utf-8');
  const before = `./__tests__/__fixtures__/before${getExtName(0, 2)}`;
  const after = `./__tests__/__fixtures__/after${getExtName(1, 3)}`;
  const processed = genDiff(before, after);
  expect(processed).toBe(expected);
});

test('NestedFiles', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expectNested', 'utf-8');
  const before = `./__tests__/__fixtures__/beforeNested${getExtName(0, 2)}`;
  const after = `./__tests__/__fixtures__/afterNested${getExtName(1, 3)}`;
  const processed = genDiff(before, after);
  expect(processed).toBe(expected);
});
