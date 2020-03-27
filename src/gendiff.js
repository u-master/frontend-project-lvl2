
import diffTree from './difftree.js';
import formatters from './formatters/index.js';

export default (obj1, obj2, format = 'nested') => formatters(format)(diffTree(obj1, obj2));
