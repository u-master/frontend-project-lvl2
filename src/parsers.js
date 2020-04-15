import yaml from 'js-yaml';
import ini from 'ini';
import error from './error.js';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

// If unknown format, then throw an exception
const parse = (format, data) => {
  if (!Object.keys(parsers).includes(format)) {
    throw error('InputFormat', `Unknown input format '${format}'.`);
  }
  return parsers[format](data);
};

export default parse;
