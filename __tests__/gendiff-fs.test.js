import fs from 'fs';
import genDiff from '../src/gendiff-fs.js';

const firstJSON = {
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


test('Relative paths', () => {
  const pathToFirstFile = 'before.json';
  const pathToSecondFile = 'after.json';
  const diff = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  writeJSONtoFile(firstJSON, pathToFirstFile);
  writeJSONtoFile(secondJSON, pathToSecondFile);

  expect(genDiff(pathToFirstFile, pathToSecondFile)).toEqual(diff);
});
