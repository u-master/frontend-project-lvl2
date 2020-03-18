
import fs from 'fs';

const readJSONfromFile = (pathFile) => {
  try {
    fs.accessSync(pathFile, fs.constants.R_OK);
    return JSON.parse(fs.readFileSync(pathFile));
  } catch (err) {
    console.error(`File "${pathFile}" no access!`);
  }
  return {};
};

const genDiff = (pathToFile1, pathToFile2) => {
  const obj1 = readJSONfromFile(pathToFile1);
  const obj2 = readJSONfromFile(pathToFile2);

  const result = JSON.stringify({ obj1, obj2 }, null, 2);
  console.log(result);
  return result;
};


export default genDiff;
