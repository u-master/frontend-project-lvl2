import _ from 'lodash';

const getKeyState = (key, before, after) => {
  if (!_.has(before, key)) return 'added';
  if (!_.has(after, key)) return 'removed';
  if (_.isObject(before[key]) && _.isObject(after[key])) return 'nested';
  if (before[key] === after[key]) return 'unchanged';
  return 'changed';
};

const buildDiffTree = (before, after) => _
  .union(Object.keys(before).sort(), Object.keys(after).sort())
  .map(
    (key) => {
      const state = getKeyState(key, before, after);
      const value = (state === 'nested')
        ? null
        : { before: before[key], after: after[key] };
      const children = (state === 'nested')
        ? buildDiffTree(before[key], after[key])
        : null;
      return {
        key,
        state,
        value,
        children,
      };
    },
  );

export default buildDiffTree;
