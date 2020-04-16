import _ from 'lodash';

const getKeyState = (key, before, after) => {
  if (!_.has(before, key)) return 'added';
  if (!_.has(after, key)) return 'removed';
  if (_.isObject(before[key]) && _.isObject(after[key])) return 'nested';
  if (before[key] === after[key]) return 'unchanged';
  return 'changed';
};

const joinKeys = (firstObj, secondObj) => {
  const [keysFirst, keysSecond] = [firstObj, secondObj].map((obj) => Object.keys(obj));
  return [...keysFirst, ...keysSecond.filter((key) => !keysFirst.includes(key))];
};

const buildDiffTree = (before, after) => joinKeys(before, after)
  .map(
    (key) => {
      const state = getKeyState(key, before, after);
      return {
        key,
        state,
        value: (state === 'nested')
          ? null
          : { before: before[key], after: after[key] },
        children: (state === 'nested')
          ? buildDiffTree(before[key], after[key])
          : null,
      };
    },
  );

export default buildDiffTree;
