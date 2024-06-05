import chalk from "chalk";
import { CommandModule } from "yargs";
import hashdiff from "./datamodel/hashdiff";


// this is the root command for all things related to the datamodel
// the one we have right now is `datamodel hashdiff`
const datamodel: CommandModule = {
    command: 'datamodel',
    describe: 'Commands related to the datamodel',
    builder: (yargs) => yargs.command(hashdiff).demandCommand().help(),
    handler: () => { console.log(chalk.red('Please provide a valid command')) }
};

export default datamodel;