import render from '../src/render.js';

const tree = [
  {
    key: 'common',
    state: 'nested',
    value: [
      {
        key: 'setting1',
        state: 'unchanged',
        value: { before: 'Value 1', after: 'Value 1' },
      },
      {
        key: 'setting2',
        state: 'removed',
        value: { before: 200, after: undefined },
      },
      {
        key: 'setting3',
        state: 'changed',
        value: { before: true, after: { key: 'value' } },
      },
      {
        key: 'setting6',
        state: 'nested',
        value: [
          {
            key: 'key',
            state: 'unchanged',
            value: { before: 'value', after: 'value' },
          },
          {
            key: 'ops',
            state: 'added',
            value: { before: undefined, after: 'vops' },
          },
        ],
      },
      {
        key: 'follow',
        state: 'added',
        value: { before: undefined, after: false },
      },
      {
        key: 'setting4',
        state: 'added',
        value: { before: undefined, after: 'blah blah' },
      },
      {
        key: 'setting5',
        state: 'added',
        value: { before: undefined, after: { key5: 'value5' } },
      },
    ],
  },
  {
    key: 'group1',
    state: 'nested',
    value: [
      {
        key: 'baz',
        state: 'changed',
        value: { before: 'bas', after: 'bars' },
      },
      {
        key: 'foo',
        state: 'unchanged',
        value: { before: 'bar', after: 'bar' },
      },
      {
        key: 'nest',
        state: 'changed',
        value: { before: { key: 'value' }, after: 'str' },
      },
    ],
  },
  {
    key: 'group2',
    state: 'removed',
    value: { before: { abc: 12345 }, after: undefined },
  },
  {
    key: 'group3',
    state: 'added',
    value: { before: undefined, after: { fee: 100500 } },
  },
];

const resultRender = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

test('Normal case', () => {
  expect(render(tree)).toEqual(resultRender);
});
