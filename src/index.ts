#! /usr/bin/env node
import 'reflect-metadata';

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import datamodel from './commands/datamodel'
import Container from 'typedi';

const workingDir = process.cwd();

Container.set('workingDir', workingDir);

yargs(hideBin(process.argv))
    .command(datamodel)
    .demandCommand()
    .help()
    .argv