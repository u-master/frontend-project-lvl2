#!/usr/bin/env node

import program from 'commander';
import genDiffFromFiles from '../src/gendiff.js';

const validFormats = ['nested', 'plain', 'json'];

program
  .version('1.0.2')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', `output format: ${validFormats.join(', ')}`, 'nested')
  .arguments('<firstConfig> <secondConfig>')
  .action(
    (firstConfig, secondConfig) => {
      try {
        console.log(genDiffFromFiles(firstConfig, secondConfig, program.format));
      } catch (e) {
        switch (e.name) {
          case 'Gendiff.InputFormat.Error':
            console.log(`Error: ${e.message} Use one of following file types: json, yml, ini.`);
            return;
          case 'Gendiff.OutputFormat.Error':
            console.log(`Error: ${e.message} Use one of following: ${validFormats.join(', ')}.`);
            return;
          default:
            console.log(e.toString());
        }
      }
    },
  );

program.parse(process.argv);
