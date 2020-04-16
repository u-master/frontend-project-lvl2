import ini from 'ini';
import _ from 'lodash';

const performIntegerValues = (parsed) => {
  const result = {};
  Object.entries(parsed)
    .forEach(
      ([key, value]) => {
        result[key] = _.isObject(value) ? performIntegerValues(value) : _.defaultTo(+`${value}`, value);
      },
    );
  return result;
};

const parseIni = (iniStr) => performIntegerValues(ini.parse(iniStr));

export default parseIni;
