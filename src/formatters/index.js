import nested from './nested.js';
import plain from './plain.js';
import error from '../error.js';

const formatters = {
  nested,
  plain,
  json: JSON.stringify,
};

const format = (outFormat, data) => {
  if (!Object.keys(formatters).includes(outFormat)) {
    throw error('OutputFormat', `Unknown output format '${outFormat}'.`);
  }
  return formatters[outFormat](data);
};

export default format;
