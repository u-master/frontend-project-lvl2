
import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const getKeyState = (e) => {
    if (!_.has(obj1, e)) return 'added';
    if (!_.has(obj2, e)) return 'removed';
    if (obj1[e] !== obj2[e]) return 'changed';
    return 'unchanged';
  };

  const buildDiffString = (operation, key, value) => `  ${operation} ${key}: ${value}`;

  const diffs = _
    .union(Object.keys(obj1), Object.keys(obj2))
    .reduce(
      (acc, e) => {
        switch (getKeyState(e)) {
          case 'added':
            return [...acc, buildDiffString('+', e, obj2[e])];
          case 'removed':
            return [...acc, buildDiffString('-', e, obj1[e])];
          case 'changed':
            return [...acc, buildDiffString('+', e, obj2[e]), buildDiffString('-', e, obj1[e])];
          case 'unchanged':
            return [...acc, buildDiffString(' ', e, obj1[e])];
          default:
            return acc;
        }
      },
      [],
    );
  return ['{', ...diffs, '}'].join('\n');
};

export default genDiff;
