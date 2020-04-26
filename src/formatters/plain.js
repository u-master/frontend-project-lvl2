import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return `${value}`;
};

const renderers = {
  added: ({ value }, path) => `Property '${path.join('.')}' was added with value ${stringifyValue(value.after)}`,
  removed: (node, path) => `Property '${path.join('.')}' was deleted`,
  changed: ({ value }, path) => `Property '${path.join('.')}' was changed from ${stringifyValue(value.before)} to ${stringifyValue(value.after)}`,
  nested: ({ children }, path, render) => render(children, path),
  unchanged: () => null,
};

const render = (tree, keyPath) => tree
  .map((node) => renderers[node.state](node, [...keyPath, node.key], render))
  .filter((diff) => diff != null)
  .join('\n');

export default (difftree) => render(difftree, []);
