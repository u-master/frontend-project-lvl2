import path from 'path';
import genDiff from '../src/gendiff-fs.js';

const diff = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const emptyDiff = `{
}`;

test('Relative paths', () => {
  const pathToFirstFile = '__fixtures__/before.json';
  const pathToSecondFile = './__fixtures__/after/after.json';

  expect(genDiff(pathToFirstFile, pathToSecondFile)).toEqual(diff);
});

test('Absolute paths', () => {
  const pathToFirstFile = path.join(__dirname, '../__fixtures__/before.json');
  const pathToSecondFile = path.join(__dirname, '../__fixtures__/after/after.json');

  expect(genDiff(pathToFirstFile, pathToSecondFile)).toEqual(diff);
});

test('Same paths', () => {
  const pathToFile = '__fixtures__/before.json';
  const beforeStr = `{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`;

  expect(genDiff(pathToFile, pathToFile)).toEqual(beforeStr);
});

test('Wrong paths', () => {
  const pathToFirstFile = path.join(__dirname, '__fixtures__/before.json');
  const pathToSecondFile = '__fixtures__/after/after.json';
  const pathAbsent = '__fixtures__/wrong/absent.json';

  expect(genDiff(pathToFirstFile, pathAbsent)).toEqual(emptyDiff);
  expect(genDiff(pathAbsent, pathToSecondFile)).toEqual(emptyDiff);
});

test.each([
  ['JSON', 'before.json', 'after.json'],
  ['YAML', 'before.YML', 'after.yml'],
  ['INI', 'before.ini', 'after.INI'],
])('%s files', (testName, firstFile, secondFile) => {
  const pathToFirstFile = path.join('__fixtures__/', firstFile);
  const pathToSecondFile = path.join('./__fixtures__/after/', secondFile);

  expect(genDiff(pathToFirstFile, pathToSecondFile)).toEqual(diff);
});

test('Unknown files', () => {
  const pathToFirstFile = '__fixtures__/before.txt';
  const pathToSecondFile = './__fixtures__/after/after.txt';

  expect(genDiff(pathToFirstFile, pathToSecondFile)).toEqual(emptyDiff);
});

/* const firstJSON = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const secondJSON = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const writeJSONtoFile = (obj, pathFile) => {
  const data = JSON.stringify(obj, null, 2);
  try {
    fs.writeFileSync(pathFile, data);
    fs.accessSync(pathFile, fs.constants.W_OK);
  } catch (err) {
    console.error(`File "${pathFile}" no access!`);
  }
};

writeJSONtoFile(firstJSON, pathToFirstFile);
writeJSONtoFile(secondJSON, pathToSecondFile);

*/
