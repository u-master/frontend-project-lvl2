import nested from './nested.js';
import plain from './plain.js';

const formatters = (format) => ({
  nested,
  plain,
  json: JSON.stringify,
}[format]);

export default formatters;
