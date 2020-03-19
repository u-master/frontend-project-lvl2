
import fs from 'fs';
import genDiff from './gendiff.js';

const readJSONfromFile = (pathFile) => {
  try {
    fs.accessSync(pathFile, fs.constants.R_OK);
    return JSON.parse(fs.readFileSync(pathFile));
  } catch (err) {
    console.error(`File "${pathFile}" no access!`);
  }
  return {};
};


const genDiffFromFiles = (pathToFile1, pathToFile2) => {
  const [obj1, obj2] = [readJSONfromFile(pathToFile1), readJSONfromFile(pathToFile2)];
  return genDiff(obj1, obj2);
};

export default genDiffFromFiles;
