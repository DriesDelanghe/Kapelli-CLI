import { transformer } from 'zod';
import { isDatavaultDefinition } from '../models/datavault-definition';
import { FileSystemManager } from './file-system-manager';
import { Inject, Service } from "typedi";
import { kapelliPropertyValues, kapelliTraversableProperties } from '../constants/kapelli-properties';
import { isLogicalDatamodel } from '../models/datamodel';


@Service()
export class HashdiffManager {

    @Inject() private fileSystemManager: FileSystemManager;

    calculateHashDiff(file: string): void {
        console.log('Calculating hash diff for datavault entities in file: ' + file);

        // Read the file
        const fileContent = this.fileSystemManager.getFileContent(file);

        if (!isLogicalDatamodel(fileContent)) {
            throw new Error('Provided file does not contain a logical datamodel');
        }

        const datavaultDefinitions: any[] = fileContent.datavaultDefinitions;

        const entityTransformers = datavaultDefinitions.map((definition: unknown) => {
            if (!isDatavaultDefinition(definition)) {
                throw new Error('Invalid datavault definition');
            }

            return {
                name: definition.name,
                kind: definition.kind,
                transformer: definition.transformations[0].transformer
            }
        })

        // Calculate the hash diff
        const hashDiffs = entityTransformers.filter((entityTransformer) => entityTransformer.kind === 'satellite')
            .map((entityTransformer) => {
                const hashDiffKeys = this.resolvePropertyNames(entityTransformer.transformer);
                return {
                    name: entityTransformer.name,
                    hashDiff: `#Hash(${hashDiffKeys.reduce((prev, curr) => prev + `,#valueof($.${curr})`, '')})`
                }
            });

        console.log(hashDiffs);
    }

    private resolvePropertyNames(object: any): string[] {
        const keys = Object.keys(object);

        const hashDiffKeys = keys.flatMap((key) => {
            if (kapelliTraversableProperties.includes(key)) {
                return this.resolvePropertyNames(object[key]);
            } else if (key.startsWith('#')) {
                return this.resolvePropertyNames(object[key]);
            } else if (!kapelliPropertyValues.includes(key)) {
                return key;
            }
            return [];
        });

        // sort alphabetically
        return hashDiffKeys.sort();
    }

}