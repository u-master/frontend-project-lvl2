import _ from 'lodash';

const getNode = (key, before, after, iter) => {
  if (!_.has(before, key)) {
    return {
      key,
      state: 'added',
      value: { after: after[key] },
    };
  }
  if (!_.has(after, key)) {
    return {
      key,
      state: 'removed',
      value: { before: before[key] },
    };
  }
  if (_.isObject(before[key]) && _.isObject(after[key])) {
    return {
      key,
      state: 'nested',
      children: iter(before[key], after[key]),
    };
  }
  if (before[key] === after[key]) {
    return {
      key,
      state: 'unchanged',
      value: { before: before[key], after: after[key] },
    };
  }
  return {
    key,
    state: 'changed',
    value: { before: before[key], after: after[key] },
  };
};

const buildDiffTree = (before, after) => _
  .union(Object.keys(before), Object.keys(after))
  .sort()
  .map(
    (key) => getNode(key, before, after, buildDiffTree),
  );

export default buildDiffTree;
