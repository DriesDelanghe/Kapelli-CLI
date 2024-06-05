import { isLogicalDatamodel } from '../models/datamodel';
import { FileSystemManager } from './file-system-manager';
import { Inject, Service } from "typedi";

@Service()
export class DatamodelManager {

    @Inject() FileSystemManager: FileSystemManager;

    getAllDatamodelFiles(): string[] {
        const allFiles = this.FileSystemManager.getAllFilesInWorkingDir();

        return allFiles.filter((file) => {
            const fileContent = this.FileSystemManager.getFileContent(file);
            return isLogicalDatamodel(fileContent);
        })
    }
}