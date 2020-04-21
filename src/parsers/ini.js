import ini from 'ini';
import _ from 'lodash';

const performIntegerValues = (parsed) => Object
  .entries(parsed)
  .reduce(
    (acc, [key, value]) => {
      acc[key] = _.isObject(value) ? performIntegerValues(value) : _.defaultTo(+`${value}`, value);
      return acc;
    },
    {},
  );

const parseIni = (iniStr) => performIntegerValues(ini.parse(iniStr));

export default parseIni;
