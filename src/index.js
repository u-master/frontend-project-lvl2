import fs from 'fs';
import path from 'path';
import buildDiffTree from './difftree.js';
import parse from './parsers/index.js';
import format from './formatters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const resolvePath = (filepath) => path.resolve(process.cwd(), filepath);

const getParsed = (filepath) => parse(fs.readFileSync(filepath, 'utf8'), getFileFormat(filepath));

const genDiff = (filepath1, filepath2, outFormat = 'nested') => {
  const [before, after] = [filepath1, filepath2]
    .map((filepath) => resolvePath(filepath))
    .map((resolvedPath) => getParsed(resolvedPath));
  const tree = buildDiffTree(before, after);
  return format(tree, outFormat);
};

export default genDiff;
