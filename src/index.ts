#! /usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import datamodel from './commands/datamodel'

yargs(hideBin(process.argv))
    .command(datamodel)
    .demandCommand()
    .help()
    .argv