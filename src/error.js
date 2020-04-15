
export default (name, message) => {
  const e = new Error(message);
  e.name = `Gendiff.${name}`;
  return e;
};
