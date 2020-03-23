import yaml from 'js-yaml';
import ini from 'ini';

const parser = (format) => ({
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
}[format]);

export default parser;
