import gendiff from './gendiff.js';

export default (file1, file2, outFormat = 'nested') => gendiff(file1, file2, outFormat);
