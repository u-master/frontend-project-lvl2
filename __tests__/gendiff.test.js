import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const results = {};

[
  results.nested,
  results.nestedNoDiff,
  results.nestedFromEmpty,
  results.nestedToEmpty,
  results.plain,
  results.json,
] = [
  '__fixtures__/nested.result',
  '__fixtures__/nested-only-before.result',
  '__fixtures__/nested-from-empty.result',
  '__fixtures__/nested-to-empty.result',
  '__fixtures__/plain.result',
  '__fixtures__/json.result',
].map((pathResult) => fs.readFileSync(pathResult, 'utf8'));

results.nestedEmptyDiff = `{
}`;

// Different sort of paths testing

test.each([
  ['Relative', '__fixtures__/before.json', './__fixtures__/after.json', results.nested],
  ['Absolute', path.join(__dirname, '../__fixtures__/before.json'), path.join(__dirname, '../__fixtures__/after.json'), results.nested],
])('%s paths', (testname, firstPath, secondPath, result) => {
  expect(genDiff(firstPath, secondPath, 'nested')).toEqual(result);
});

// Different file types and structures testing

test.each([
  ['Input: JSON files; output: nested.', 'before.json', 'after.json', 'nested', results.nested],
  ['Input: YAML files; output: nested.', 'before.yml', 'after.yml', 'nested', results.nested],
  ['Input: INI files; output: nested.', 'before.ini', 'after.ini', 'nested', results.nested],
  ['Input: JSON files; output: plain.', 'before.json', 'after.json', 'plain', results.plain],
  ['Input: JSON files; output: json.', 'before.json', 'after.json', 'json', results.json],
  ['Input: Empty JSON + Normal JSON; output: nested.', 'empty.json', 'before.json', 'nested', results.nestedFromEmpty],
  ['Input: Normal JSON + Empty JSON; output: nested.', 'before.json', 'empty.json', 'nested', results.nestedToEmpty],
  ['Input: Same JSON files; output: nested.', 'before.json', 'before.json', 'nested', results.nestedNoDiff],
  ['Input: INI+JSON files; output: nested.', 'before.ini', 'after.json', 'nested', results.nested],
  ['Input: Same INI+JSON files; output: nested.', 'before.ini', 'before.json', 'nested', results.nestedNoDiff],
])('%s', (testName, firstFile, secondFile, outFormat, result) => {
  const pathToFirstFile = path.join('__fixtures__', firstFile);
  const pathToSecondFile = path.join('./__fixtures__/', secondFile);
  expect(genDiff(pathToFirstFile, pathToSecondFile, outFormat)).toEqual(result);
});

test('Unknown input type.', () => {
  expect(
    () => genDiff(
      path.join('__fixtures__', 'before.txt'),
      path.join('__fixtures__', 'after.txt'),
      'nested',
    ),
  ).toThrowError('Unknown input format');
});

test('Unknown output type.', () => {
  expect(
    () => genDiff(
      path.join('__fixtures__', 'before.yml'),
      path.join('__fixtures__', 'after.yml'),
      'unknown',
    ),
  ).toThrowError('Unknown output format');
});