import formatter from '../src/formatters';

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

test('Nested output case', () => {
  const result = `{
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

  expect(formatter('nested')(tree)).toEqual(result);
});

test('Plain output case', () => {
  const result = `Property 'common.setting2' was deleted
Property 'common.setting3' was changed from true to [complex value]
Property 'common.setting6.ops' was added with value 'vops'
Property 'common.follow' was added with value false
Property 'common.setting4' was added with value 'blah blah'
Property 'common.setting5' was added with value [complex value]
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from [complex value] to 'str'
Property 'group2' was deleted
Property 'group3' was added with value [complex value]`;

  expect(formatter('plain')(tree)).toEqual(result);
});

test('JSON output case', () => {
  const result = ['[{"key":"common","state":"nested","value":',
    '[{"key":"setting1","state":"unchanged","value":{"before":"Value 1","after":"Value 1"}},',
    '{"key":"setting2","state":"removed","value":{"before":200}},',
    '{"key":"setting3","state":"changed","value":{"before":true,"after":{"key":"value"}}},',
    '{"key":"setting6","state":"nested","value":',
    '[{"key":"key","state":"unchanged","value":{"before":"value","after":"value"}},',
    '{"key":"ops","state":"added","value":{"after":"vops"}}]},',
    '{"key":"follow","state":"added","value":{"after":false}},',
    '{"key":"setting4","state":"added","value":{"after":"blah blah"}},',
    '{"key":"setting5","state":"added","value":{"after":{"key5":"value5"}}}]},',
    '{"key":"group1","state":"nested","value":',
    '[{"key":"baz","state":"changed","value":{"before":"bas","after":"bars"}},',
    '{"key":"foo","state":"unchanged","value":{"before":"bar","after":"bar"}},',
    '{"key":"nest","state":"changed","value":{"before":{"key":"value"},"after":"str"}}]},',
    '{"key":"group2","state":"removed","value":{"before":{"abc":12345}}},',
    '{"key":"group3","state":"added","value":{"after":{"fee":100500}}}]'].join('');

  expect(formatter('json')(tree)).toEqual(result);
});
