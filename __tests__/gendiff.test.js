import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const results = {};

beforeAll(() => {
  [
    results.nested,
    results.plain,
    results.json,
  ] = [
    '__fixtures__/nested.result',
    '__fixtures__/plain.result',
    '__fixtures__/json.result',
  ].map((pathResult) => fs.readFileSync(pathResult, 'utf8'));
});

// Different sort of paths testing

test.each([
  ['Relative', '__fixtures__/before.json', './__fixtures__/after.json', 'nested'],
  ['Absolute', path.join(__dirname, '../__fixtures__/before.json'), path.join(__dirname, '../__fixtures__/after.json'), 'nested'],
])('%s paths', (testname, firstPath, secondPath, resultName) => {
  expect(genDiff(firstPath, secondPath, 'nested')).toEqual(results[resultName]);
});

// Different file types and structures testing

test.each([
  ['Input: JSON files', 'before.json', 'after.json'],
  ['Input: YAML files', 'before.yml', 'after.yml'],
  ['Input: INI files', 'before.ini', 'after.ini'],
  ['Input: INI+JSON files', 'before.ini', 'after.json'],
])('%s', (testName, firstFile, secondFile) => {
  const pathToFirstFile = path.join('__fixtures__', firstFile);
  const pathToSecondFile = path.join('__fixtures__/', secondFile);
  ['nested', 'plain', 'json'].forEach(
    (outFormat) => expect(
      genDiff(pathToFirstFile, pathToSecondFile, outFormat),
    ).toEqual(results[outFormat]),
  );
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
