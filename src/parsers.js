import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

// If unknown format, then throw an exception
const parse = (format, data) => {
  if (!Object.keys(parsers).includes(format)) {
    const e = new Error(`Unknown input format '${format}'.`);
    e.name = 'Gendiff.InputFormat.Error';
    throw e;
  }
  return parsers[format](data);
};

export default parse;
