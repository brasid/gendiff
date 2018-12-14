import fs from 'fs';
import genDiff from '../src';

const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const extNames = ['.json', '.yml', '.ini'];

const getExtName = (num1, num2) => extNames[getRandomNum(num1, num2)];

const ext1 = getExtName(0, 2);
const ext2 = getExtName(1, 3);

test('PlainFiles', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected', 'utf-8');
  const before = `./__tests__/__fixtures__/before${ext1}`;
  const after = `./__tests__/__fixtures__/after${ext2}`;
  const processed = genDiff(before, after);
  expect(processed).toBe(expected);
});

test('NestedFiles', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expectNested', 'utf-8');
  const before = `./__tests__/__fixtures__/beforeNested${ext1}`;
  const after = `./__tests__/__fixtures__/afterNested${ext2}`;
  const processed = genDiff(before, after);
  expect(processed).toBe(expected);
});
