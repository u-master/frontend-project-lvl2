import nested from './nested.js';
import plain from './plain.js';

const formatters = {
  nested,
  plain,
  json: JSON.stringify,
};

const format = (outFormat, data) => {
  if (!Object.keys(formatters).includes(outFormat)) {
    const e = new Error(`Unknown output format '${outFormat}'.`);
    e.name = 'Gendiff.OutputFormat.Error';
    throw e;
  }
  return formatters[outFormat](data);
};

export default format;
