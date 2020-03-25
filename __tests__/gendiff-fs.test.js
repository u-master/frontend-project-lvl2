import path from 'path';
import genDiff from '../src/gendiff-fs.js';

const diffFlat = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const beforeFlatNoDiff = `{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`;

const diffNested = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

const emptyDiff = `{
}`;

// Different sort of paths testing

test.each([
  ['Relative', '__fixtures__/flat/before.json', './__fixtures__/flat/after/after.json', diffFlat],
  ['Absolute', path.join(__dirname, '../__fixtures__/flat/before.json'), path.join(__dirname, '../__fixtures__/flat/after/after.json'), diffFlat],
  ['Same', '__fixtures__/flat/before.json', '__fixtures__/flat/before.json', beforeFlatNoDiff],
  ['Wrong (Second)', path.join(__dirname, '../__fixtures__/flat/before.json'), '__fixtures__/wrong/absent.json', emptyDiff],
  ['Wrong (First)', '__fixtures__/wrong/absent.json', '__fixtures__/flat/after/after.json', emptyDiff],
])('%s paths', (testname, firstPath, secondPath, result) => {
  expect(genDiff(firstPath, secondPath)).toEqual(result);
});

// Different file types and structures testing

test.each([
  ['Flat JSON', 'flat', 'before.json', 'after.json', diffFlat],
  ['Flat YAML', 'flat', 'before.YML', 'after.yml', diffFlat],
  ['Flat INI', 'flat', 'before.ini', 'after.INI', diffFlat],
  ['Nested JSON', 'nested', 'before.json', 'after.json', diffNested],
  ['Nested YAML', 'nested', 'before.YML', 'after.yml', diffNested],
  ['Nested INI', 'nested', 'before.ini', 'after.INI', diffNested],
  ['Unknown files', '.', 'before.txt', 'after.txt', emptyDiff],
])('%s files', (testName, dir, firstFile, secondFile, result) => {
  const pathToFirstFile = path.join('__fixtures__', dir, firstFile);
  const pathToSecondFile = path.join('./__fixtures__/', dir, secondFile);
  expect(genDiff(pathToFirstFile, pathToSecondFile)).toEqual(result);
});
