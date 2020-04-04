import nested from './nested.js';
import plain from './plain.js';

const formatters = {
  nested,
  plain,
  json: JSON.stringify,
};

const format = (outFormat) => formatters[outFormat];

export default format;
