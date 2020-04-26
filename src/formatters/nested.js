import _ from 'lodash';

const indent = (depth) => ' '.repeat(4 * depth);

const stringifyValue = (value, depth, builder) => {
  if (!_.isObject(value)) return value;
  return [
    '{',
    ...Object.entries(value)
      .map(([k, v]) => builder(' ', k, v, depth + 1)),
    `${indent(depth + 1)}}`,
  ].join('\n');
};

const buildDiffString = (operation, key, value, depth) => `${indent(depth)}  ${operation} ${key}: ${stringifyValue(value, depth, buildDiffString)}`;

const renderers = {
  added: ({ key, value }, depth) => buildDiffString('+', key, value.after, depth),
  removed: ({ key, value }, depth) => buildDiffString('-', key, value.before, depth),
  nested: ({ key, children }, depth, render) => buildDiffString(' ', key, render(children, depth + 1), depth),
  changed: ({ key, value }, depth) => [
    buildDiffString('-', key, value.before, depth),
    buildDiffString('+', key, value.after, depth),
  ].join('\n'),
  unchanged: ({ key, value }, depth) => buildDiffString(' ', key, value.before, depth),
};

const render = (difftree, depth) => [
  '{',
  ...difftree.map((node) => renderers[node.state](node, depth, render)),
  `${indent(depth)}}`,
].join('\n');


export default (difftree) => render(difftree, 0);
