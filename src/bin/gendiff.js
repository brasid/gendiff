#!/usr/bin/env node

import commander from 'commander';

commander
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
