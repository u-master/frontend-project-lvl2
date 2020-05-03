import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const results = {};

// Resolve path to fixture

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// First of all, before tests, initialize results object.

beforeAll(() => {
  [
    results.nested,
    results.plain,
    results.json,
  ] = [
    'nested.result',
    'plain.result',
    'json.result',
  ].map((filename) => fs.readFileSync(getFixturePath(filename), 'utf-8'));
});

// Different path types testing

test.each([
  ['Relative', '__fixtures__/before.json', './__fixtures__/after.json'],
  ['Absolute', getFixturePath('before.json'), getFixturePath('after.json')],
])('%s paths', (testname, firstPath, secondPath) => {
  expect(genDiff(firstPath, secondPath, 'nested')).toEqual(results.nested);
});

// Different file types and structures testing

test.each([
  ['Input: JSON files. Output: nested format.', 'before.json', 'after.json', 'nested'],
  ['Input: JSON files. Output: plain format.', 'before.json', 'after.json', 'plain'],
  ['Input: JSON files. Output: json format.', 'before.json', 'after.json', 'json'],
  ['Input: YAML files. Output: nested format.', 'before.yml', 'after.yml', 'nested'],
  ['Input: YAML files. Output: plain format.', 'before.yml', 'after.yml', 'plain'],
  ['Input: YAML files. Output: json format.', 'before.yml', 'after.yml', 'json'],
  ['Input: INI files. Output: nested format.', 'before.ini', 'after.ini', 'nested'],
  ['Input: INI files. Output: plain format.', 'before.ini', 'after.ini', 'plain'],
  ['Input: INI files. Output: json format.', 'before.ini', 'after.ini', 'json'],
  ['Input: INI+JSON files', 'before.ini', 'after.json', 'nested'],
])('%s', (testName, firstFile, secondFile, outFormat) => {
  expect(
    genDiff(getFixturePath(firstFile), getFixturePath(secondFile), outFormat),
  ).toEqual(results[outFormat]);
});

test('Unknown input type.', () => {
  expect(
    () => genDiff(
      getFixturePath('before.txt'),
      getFixturePath('after.txt'),
      'nested',
    ),
  ).toThrowError('Unknown input format');
});

test('Unknown output type.', () => {
  expect(
    () => genDiff(
      getFixturePath('before.yml'),
      getFixturePath('after.yml'),
      'unknown',
    ),
  ).toThrowError('Unknown output format');
});
