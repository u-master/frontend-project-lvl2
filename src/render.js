
import _ from 'lodash';

const addIndent = (depth) => ' '.repeat(4 * depth + 2);

const buildDiffString = (operation, key, value, depth) => {
  const renderedValue = (
    _.isObject(value)
      ? [
        '{',
        ...Object
          .entries(value)
          .map(
            ([k, v]) => buildDiffString(' ', k, v, depth + 1),
          ),
        buildDiffString(' ', null, '}', depth),
      ]
      : [value]
  ).join('\n');
  return `${addIndent(depth)}${operation} ${key ? `${key}: ` : ''}${renderedValue}`;
};

const render = (difftree) => {
  const iterRender = (depth, tree) => tree.reduce(
    (acc, { key, state, value }) => {
      switch (state) {
        case 'added':
          return [...acc, buildDiffString('+', key, value.after, depth)];
        case 'removed':
          return [...acc, buildDiffString('-', key, value.before, depth)];
        case 'nested':
          return [...acc, buildDiffString(' ', key, '{', depth), ...iterRender(depth + 1, value), buildDiffString(' ', null, '}', depth)];
        case 'changed':
          return [...acc, buildDiffString('-', key, value.before, depth), buildDiffString('+', key, value.after, depth)];
        case 'unchanged':
          return [...acc, buildDiffString(' ', key, value.before, depth)];
        default:
      }
      return acc;
    },
    [],
  );

  return ['{', ...iterRender(0, difftree), '}'].join('\n');
};

export default render;
