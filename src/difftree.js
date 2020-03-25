import _ from 'lodash';

const diffTree = (obj1, obj2) => {
  const iterBuildTree = (before, after) => {
    const getKeyState = (key) => {
      if (!_.has(before, key)) return 'added';
      if (!_.has(after, key)) return 'removed';
      if (_.isObject(before[key]) && _.isObject(after[key])) return 'nested';
      if (before[key] === after[key]) return 'unchanged';
      return 'changed';
    };

    return _.union(Object.keys(before), Object.keys(after)).map(
      (key) => {
        const state = getKeyState(key);
        return {
          key,
          state,
          value: (state === 'nested')
            ? iterBuildTree(before[key], after[key])
            : { before: before[key], after: after[key] },
        };
      },
    );
  };

  return iterBuildTree(obj1, obj2);
};

export default diffTree;
