import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const results = {};

// Resolve path to fixture

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// First of all, before tests, initialize results object.

beforeAll(() => {
  results.nested = readFixture('nested.result');
  results.plain = readFixture('plain.result');
  results.json = readFixture('json.result');
});

// Relative path testing. All other tests used absolute paths.

test('Relative paths', () => {
  expect(genDiff('__fixtures__/before.json', './__fixtures__/after.json', 'nested')).toEqual(results.nested);
});

// Different file types and structures testing

test.each([
  ['Input: JSON files.', 'json'],
  ['Input: YAML files.', 'yml'],
  ['Input: INI files.', 'ini'],
])('%s', (testName, inFormat) => {
  Object.entries(results).forEach(([outFormat, result]) => {
    const filepath1 = getFixturePath(`before.${inFormat}`);
    const filepath2 = getFixturePath(`after.${inFormat}`);
    const diff = genDiff(filepath1, filepath2, outFormat);
    expect(diff).toEqual(result);
  });
});

// Test of mixed input formats

test('Input: INI+JSON files', () => {
  expect(
    genDiff(getFixturePath('before.ini'), getFixturePath('after.json'), 'nested'),
  ).toEqual(results.nested);
});

// Unknown inputs and outputs.

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
