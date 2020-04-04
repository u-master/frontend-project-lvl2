
import buildDiffTree from './difftree.js';
import format from './formatters/index.js';

export default (obj1, obj2, outFormat) => {
  const tree = buildDiffTree(obj1, obj2);
  return format(outFormat)(tree);
};
