import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return `${value}`;
};

const buildDiffString = (state) => ({
  added: (key, value) => `Property '${key}' was added with value ${stringifyValue(value.after)}`,
  removed: (key) => `Property '${key}' was deleted`,
  changed: (key, value) => `Property '${key}' was changed from ${stringifyValue(value.before)} to ${stringifyValue(value.after)}`,
}[state]);

const render = (difftree) => {
  const iterRender = (keyPathAcc, tree) => tree.reduce(
    (acc, { key, state, value }) => {
      const keyPath = [...keyPathAcc, key];
      if (state === 'nested') return [...acc, ...iterRender(keyPath, value)];
      if (state === 'unchanged') return acc;
      return [...acc, buildDiffString(state)(keyPath.join('.'), value)];
    },
    [],
  );

  return iterRender([], difftree).join('\n');
};

export default render;
