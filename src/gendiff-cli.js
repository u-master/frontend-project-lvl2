
import program from 'commander';
import genDiff from './gendiff-fs.js';

const validFormatOption = ['nested', 'plain'];

export default () => {
  program.version('1.0.1')
    .description('Compares two configuration files and shows a difference.');

  program.option('-f, --format [type]', `output format: ${validFormatOption.join(', ')}`, 'nested');

  program.arguments('<firstConfig> <secondConfig>')
    .action(
      (firstConfig, secondConfig) => {
        if (!validFormatOption.includes(program.format)) {
          console.log(`Incorrect format option '${program.format}'. Use one of following: ${validFormatOption.join(', ')}.`);
        } else {
          console.log(genDiff(firstConfig, secondConfig, program.format));
        }
      },
    );


  program.parse(process.argv);
};
