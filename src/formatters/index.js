import nested from './nested.js';
import plain from './plain.js';

const formatters = {
  nested,
  plain,
  json: JSON.stringify,
};

const format = (data, outFormat) => {
  const formatter = formatters[outFormat];
  if (!formatter) {
    throw new Error(`Unknown output format '${outFormat}'.`);
  }
  return formatter(data);
};

export default format;
