
import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
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

const parseFile = (pathFile) => {
  const format = getFileFormat(pathFile);
  if (!parser(format)) {
    return null;
  }
  const data = readFile(pathFile);
  return data ? parser(format)(data) : data;
};

const genDiffFromFiles = (pathToFile1, pathToFile2, outFormat) => {
  const [obj1, obj2] = [parseFile(pathToFile1), parseFile(pathToFile2)];
  return (obj1 && obj2) ? genDiff(obj1, obj2, outFormat) : '{\n}';
};

export default genDiffFromFiles;
