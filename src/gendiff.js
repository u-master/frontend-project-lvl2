
import buildDiffTree from './difftree.js';
import formatters from './formatters/index.js';

export default (obj1, obj2, format = 'nested') => formatters(format)(buildDiffTree(obj1, obj2));
