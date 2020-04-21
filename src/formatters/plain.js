import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return `${value}`;
};

const renderers = {
  added: (keyPath, { value }) => `Property '${keyPath}' was added with value ${stringifyValue(value.after)}`,
  removed: (keyPath) => `Property '${keyPath}' was deleted`,
  changed: (keyPath, { value }) => `Property '${keyPath}' was changed from ${stringifyValue(value.before)} to ${stringifyValue(value.after)}`,
  nested: (keyPath, { children }, render) => render(children, keyPath),
  unchanged: () => null,
};

const render = (tree, keyPath) => tree
  .map((node) => renderers[node.state](`${keyPath ? `${keyPath}.` : ''}${node.key}`, node, render))
  .filter((diff) => diff != null)
  .join('\n');

export default (difftree) => render(difftree, null);
