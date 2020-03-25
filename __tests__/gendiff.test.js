import genDiff from '../src/gendiff.js';

test('Normal cases', () => {
  const obj11 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  const obj12 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  const diff1 = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

  const obj21 = {
    name: 'Ivanov',
    surname: 'Petr',
    age: 25,
    pol: 'male',
  };

  const obj22 = {
    age: 25,
    surname: 'Petrov',
    midname: 'Akakievitch',
    name: 'Ivan',
    sex: 'regular',
  };

  const diff2 = `{
  - name: Ivanov
  + name: Ivan
  - surname: Petr
  + surname: Petrov
    age: 25
  - pol: male
  + midname: Akakievitch
  + sex: regular
}`;

  expect(genDiff(obj11, obj12)).toEqual(diff1);
  expect(genDiff(obj21, obj22)).toEqual(diff2);
});


test('Empty cases', () => {
  const obj = {
    name: 'Ivan',
    midname: 'Akakievitch',
    surname: 'Petrov',
    age: 25,
    sex: 'male',
  };

  const objEmpty = {};

  const diff1 = `{
  - name: Ivan
  - midname: Akakievitch
  - surname: Petrov
  - age: 25
  - sex: male
}`;

  const diff2 = `{
  + name: Ivan
  + midname: Akakievitch
  + surname: Petrov
  + age: 25
  + sex: male
}`;

  expect(genDiff(obj, objEmpty)).toEqual(diff1);
  expect(genDiff(objEmpty, obj)).toEqual(diff2);
});

test('No differences case', () => {
  const obj = {
    name: 'Ivan',
    midname: 'Akakievitch',
    surname: 'Petrov',
    age: 25,
    sex: 'male',
  };

  const noDiffs = `{
    name: Ivan
    midname: Akakievitch
    surname: Petrov
    age: 25
    sex: male
}`;

  expect(genDiff({ ...obj }, { ...obj })).toEqual(noDiffs);
});
