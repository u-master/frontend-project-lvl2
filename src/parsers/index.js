import yaml from 'js-yaml';
import parseIni from './ini.js';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

// If unknown format, then throw an exception
const parse = (data, format) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`Unknown input format '${format}'.`);
  }
  return parser(data);
};

export default parse;
