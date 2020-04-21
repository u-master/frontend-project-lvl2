#!/usr/bin/env node

import program from 'commander';
import genDiffFromFiles from '../src/index.js';

const validFormats = ['nested', 'plain', 'json'];

program
  .version('1.0.2')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', `output format: ${validFormats.join(', ')}`, 'nested')
  .arguments('<firstConfig> <secondConfig>')
  .action(
    (firstConfig, secondConfig) => {
      console.log(genDiffFromFiles(firstConfig, secondConfig, program.format));
    },
  );

program.parse(process.argv);
