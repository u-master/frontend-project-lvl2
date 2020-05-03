import _ from 'lodash';

const getNode = (key, before, after, treeBuild) => {
  if (!_.has(before, key)) {
    return {
      key,
      state: 'added',
      value: { before: null, after: after[key] },
      children: null,
    };
  }
  if (!_.has(after, key)) {
    return {
      key,
      state: 'removed',
      value: { before: before[key], after: null },
      children: null,
    };
  }
  if (_.isObject(before[key]) && _.isObject(after[key])) {
    return {
      key,
      state: 'nested',
      value: null,
      children: treeBuild(before[key], after[key]),
    };
  }

  return {
    key,
    state: (before[key] === after[key]) ? 'unchanged' : 'changed',
    value: { before: before[key], after: after[key] },
    children: null,
  };
};

const buildDiffTree = (before, after) => _
  .union(Object.keys(before), Object.keys(after))
  .sort()
  .map(
    (key) => getNode(key, before, after, buildDiffTree),
  );

export default buildDiffTree;
