import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getNothing = () => (null);

// If unknown format, then parser return just null
const parse = (format) => (parsers[format] || getNothing);

export default parse;
