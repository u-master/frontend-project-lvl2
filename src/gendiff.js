
import fs from 'fs';
import path from 'path';
import buildDiffTree from './difftree.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const getFileFormat = (pathFile) => path.extname(pathFile).slice(1);

const resolvePath = (pathFile) => path.resolve(process.cwd(), pathFile);

const genDiff = (pathToFile1, pathToFile2, outFormat) => {
  const [parsedFile1, parsedFile2] = [resolvePath(pathToFile1), resolvePath(pathToFile2)]
    .map((file) => ({ format: getFileFormat(file), content: fs.readFileSync(file, 'utf8') }))
    .map((data) => parse(data.format, data.content));
  const tree = buildDiffTree(parsedFile1, parsedFile2);
  return format(outFormat, tree);
};

export default genDiff;
