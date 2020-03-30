
import makeDiffTree from './difftree.js';
import formatters from './formatters/index.js';

export default (obj1, obj2, format = 'nested') => formatters(format)(makeDiffTree(obj1, obj2));
