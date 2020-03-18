import program from 'commander';

export default () => {
  program.version('1.0.1')
    .description('Compares two configuration files and shows a difference.');
  program.parse(process.argv);
  console.log(program);
};
