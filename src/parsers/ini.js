import ini from 'ini';
import _ from 'lodash';

const numberifyValues = (parsed) => Object
  .entries(parsed)
  .reduce(
    (acc, [key, value]) => {
      if (!_.isObject(value)) {
        const parsedNum = parseFloat(value);
        return { ...acc, [key]: _.defaultTo(parsedNum, value) };
      }
      return { ...acc, [key]: numberifyValues(value) };
    },
    {},
  );

const parseIni = (iniStr) => numberifyValues(ini.parse(iniStr));

export default parseIni;
