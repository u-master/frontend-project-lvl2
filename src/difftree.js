import _ from 'lodash';

const nodeStates = [
  {
    check: (key, before) => !_.has(before, key),
    create: (key, before, after) => ({ key, state: 'added', value: { after: after[key] } }),
  },
  {
    check: (key, before, after) => !_.has(after, key),
    create: (key, before) => ({ key, state: 'removed', value: { before: before[key] } }),
  },
  {
    check: (key, before, after) => _.isObject(before[key]) && _.isObject(after[key]),
    create: (key, before, after, iter) => ({ key, state: 'nested', children: iter(before[key], after[key]) }),
  },
  {
    check: (key, before, after) => before[key] === after[key],
    create: (key, before) => ({ key, state: 'unchanged', value: { before: before[key] } }),
  },
  {
    check: (key, before, after) => before[key] !== after[key],
    create: (key, before, after) => ({ key, state: 'changed', value: { before: before[key], after: after[key] } }),
  },
];

const getNode = (key, before, after, iter) => {
  const { create } = nodeStates.find(({ check }) => check(key, before, after));
  return create(key, before, after, iter);
};

const buildDiffTree = (before, after) => _
  .union(Object.keys(before), Object.keys(after))
  .sort()
  .map((key) => getNode(key, before, after, buildDiffTree));

export default buildDiffTree;
