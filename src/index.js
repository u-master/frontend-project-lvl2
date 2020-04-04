import gendiff from './gendiff.js';

export default (obj1, obj2, outFormat = 'nested') => gendiff(obj1, obj2, outFormat);
