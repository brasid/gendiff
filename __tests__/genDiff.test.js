import fs from 'fs';
import genDiff from '../src';

test('GenDiff', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected', 'utf-8');
  const processed = genDiff('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json');
  expect(processed).toBe(expected);
});
