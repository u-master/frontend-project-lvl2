import fs from 'fs';
import path from 'path';
import buildDiffTree from './difftree.js';
import parse from './parsers/index.js';
import format from './formatters/index.js';

const getFileFormat = (pathFile) => path.extname(pathFile).slice(1);

const resolvePath = (pathFile) => path.resolve(process.cwd(), pathFile);

const genDiff = (pathToFile1, pathToFile2, outFormat = 'nested') => {
  const [parsedFile1, parsedFile2] = [pathToFile1, pathToFile2]
    .map((filePath) => {
      const resolvedPath = resolvePath(filePath);
      return parse(fs.readFileSync(resolvedPath, 'utf8'), getFileFormat(resolvedPath));
    });
  const tree = buildDiffTree(parsedFile1, parsedFile2);
  return format(tree, outFormat);
};

export default genDiff;
