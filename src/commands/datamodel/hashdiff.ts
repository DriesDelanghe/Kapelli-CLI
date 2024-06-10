import chalk from "chalk";
import Container from "typedi";
import { CommandModule } from "yargs";
import { DatamodelManager } from "../../managers/datamodel-manager";
import { HashdiffManager } from "../../managers/hashdiff-manager";
import * as yargs from 'yargs';


const workingDir = process.cwd();

Container.set('workingDir', workingDir);

const datamodelManager = Container.get(DatamodelManager);
const hashDiffManager = Container.get(HashdiffManager);

const hashdiff: CommandModule = {
    command: 'hashdiff',
    describe: 'Resolves the calculated hashdiffs for all satellites of a datamodel',
    builder: (yargs) => {
        return yargs.option('file', {
            alias: 'f',
            describe: 'The path to the logical datamodel file',
            type: 'string',
            demandOption: true,
        })
    },
    handler: (argv) => {
        hashDiffManager.calculateHashDiff(argv.file as string);
    }
};

export default hashdiff;