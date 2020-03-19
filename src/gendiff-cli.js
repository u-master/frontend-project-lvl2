
import program from 'commander';
import genDiff from './gendiff-fs.js';

export default () => {
  program.version('1.0.1')
    .description('Compares two configuration files and shows a difference.');

  program.arguments('<firstConfig> <secondConfig>')
    .action(
      (firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)),
    );

  program.option('-f, --format [type]', 'output format');

  program.parse(process.argv);

  console.log(`Format: ${program.format}`);
};
