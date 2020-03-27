
import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import genDiff from './gendiff.js';

const readFile = (pathFile) => {
  const format = path.extname(pathFile).replace('.', '').toLowerCase();
  if (!parser(format)) {
    console.log(`Unknown format of ${pathFile}`);
    return null;
  }
  try {
    fs.accessSync(pathFile, fs.constants.R_OK);
    return parser(format)(fs.readFileSync(pathFile, 'utf8'));
  } catch (err) {
    console.error(`File "${pathFile}" no access!`);
  }
  return null;
};


const genDiffFromFiles = (pathToFile1, pathToFile2, format) => {
  const [obj1, obj2] = [readFile(pathToFile1), readFile(pathToFile2)];
  if (obj1 && obj2) {
    return genDiff(obj1, obj2, format);
  }
  return '{\n}';
};

export default genDiffFromFiles;
