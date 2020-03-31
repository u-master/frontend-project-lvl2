import _ from 'lodash';

const getKeyState = (key, before, after) => {
  if (!_.has(before, key)) return 'added';
  if (!_.has(after, key)) return 'removed';
  if (_.isObject(before[key]) && _.isObject(after[key])) return 'nested';
  if (before[key] === after[key]) return 'unchanged';
  return 'changed';
};


const buildDiffTree = (before, after) => _
  .union(Object.keys(before), Object.keys(after))
  .map(
    (key) => {
      const state = getKeyState(key, before, after);
      return {
        key,
        state,
        value: (state === 'nested')
          ? buildDiffTree(before[key], after[key])
          : { before: before[key], after: after[key] },
      };
    },
  );

export default buildDiffTree;
