import chalk from "chalk";
import { CommandModule } from "yargs";


const hashdiff: CommandModule = {
    command: 'hashdiff',
    describe: 'Resolves the calculated hashdiffs for all satellites of a datamodel',
    builder: (yargs) => yargs.option('file', {
        alias: 'f',
        describe: 'The path to the datamodel file',
        type: 'string',
        demandOption: true
    }),
    handler: (argv) => {
        console.log(chalk.green('hashdiff command called with file: '), argv.file);
    }
};

export default hashdiff;