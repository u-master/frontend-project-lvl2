import _ from 'lodash';

const indent = (depth, shift = 2) => ' '.repeat(4 * depth + shift);

const buildCloseBraces = (depth) => `${indent(depth, 0)}}`;

const buildDiffString = (operation, key, value, depth) => {
  const buildValue = () => {
    if (!_.isObject(value)) return value;
    return [
      '{',
      ...Object.entries(value)
        .map(([k, v]) => buildDiffString(' ', k, v, depth + 1)),
      buildCloseBraces(depth + 1),
    ].join('\n');
  };

  return `${indent(depth)}${operation} ${key}: ${buildValue()}`;
};

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
  buildCloseBraces(depth),
].join('\n');


export default (difftree) => render(difftree, 0);
