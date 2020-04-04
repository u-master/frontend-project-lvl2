
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import genDiff from './gendiff.js';

const readFile = (pathFile) => {
  try {
    fs.accessSync(pathFile, fs.constants.R_OK);
    return fs.readFileSync(pathFile, 'utf8');
  } catch (err) {
    console.error(`File "${pathFile}" no access!`);
  }
  return null;
};

const getFileFormat = (pathFile) => path.extname(pathFile).replace('.', '').toLowerCase();

const genDiffFromFiles = (pathToFile1, pathToFile2, outFormat) => {
  const [parsedFile1, parsedFile2] = [pathToFile1, pathToFile2]
    .map((file) => ({ format: getFileFormat(file), content: readFile(file) }))
    .map((data) => (data.content ? parse(data.format)(data.content) : null));
  return (parsedFile1 && parsedFile2) ? genDiff(parsedFile1, parsedFile2, outFormat) : '{\n}';
};

export default genDiffFromFiles;
