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
    const message = `Unknown input format '${format}'.`;
    throw error('InputFormat', message);
  }
  return parsers[format](data);
};

export default parse;
