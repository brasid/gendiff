#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .program.parse(process.argv);
