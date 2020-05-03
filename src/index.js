import fs from 'fs';
import path from 'path';
import buildDiffTree from './difftree.js';
import parse from './parsers/index.js';
import format from './formatters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const resolvePath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (pathToFile1, pathToFile2, outFormat = 'nested') => {
  const [before, after] = [pathToFile1, pathToFile2]
    .map((filepath) => {
      const resolvedPath = resolvePath(filepath);
      return parse(fs.readFileSync(resolvedPath, 'utf8'), getFileFormat(resolvedPath));
    });
  const tree = buildDiffTree(before, after);
  return format(tree, outFormat);
};

export default genDiff;
