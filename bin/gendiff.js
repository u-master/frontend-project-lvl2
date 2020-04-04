#!/usr/bin/env node

import program from 'commander';
import genDiffFromFiles from '../src/gendiff-fs.js';

const validFormats = ['nested', 'plain', 'json'];

program
  .version('1.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', `output format: ${validFormats.join(', ')}`, 'nested')
  .arguments('<firstConfig> <secondConfig>')
  .action(
    (firstConfig, secondConfig) => {
      if (!validFormats.includes(program.format)) {
        console.log(`Incorrect format option '${program.format}'. Use one of following: ${validFormats.join(', ')}.`);
      } else {
        console.log(genDiffFromFiles(firstConfig, secondConfig, program.format));
      }
    },
  );

program.parse(process.argv);
