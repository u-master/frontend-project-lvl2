import nested from './nested.js';
import plain from './plain.js';

const formatters = (format) => ({
  nested,
  plain,
}[format]);

export default formatters;
