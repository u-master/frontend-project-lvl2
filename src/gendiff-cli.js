
import program from 'commander';
import genDiffFromFiles from './gendiff-fs.js';

const validFormatOption = ['nested', 'plain', 'json'];

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
          console.log(genDiffFromFiles(firstConfig, secondConfig, program.format));
        }
      },
    );

  program.parse(process.argv);
};
