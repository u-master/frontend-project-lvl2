import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
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
