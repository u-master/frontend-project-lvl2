import yaml from 'js-yaml';

const parser = (format) => ({
  json: JSON.parse,
  yml: yaml.safeLoad,
}[format]);

export default parser;
