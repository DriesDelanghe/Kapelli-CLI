
import { Inject, Service } from "typedi";
import { existsSync, readFileSync, readdirSync } from "fs";
import { resolve } from "path";

import { FileNotFoundException } from "../exceptions/file-not-found-exception";

@Service()
export class FileSystemManager {
    @Inject('workingDir') private workingDir: string;

    getFileContent(name: string, relativePath?: string): any {
        const path = this.getPath(name, relativePath);
        // read the file content
        if (!existsSync(path)) {
            throw new FileNotFoundException(`The file ${name} does not exist.`);
        }

        const content = readFileSync(path, 'utf8');

        return JSON.parse(content);
    }

    private getPath(name: string, relativePath?: string): string {
        const path = relativePath ? resolve(this.workingDir, relativePath, name) : resolve(this.workingDir, name);
        return path;
    }

    getAllFilesInWorkingDir(parentDir?: string): string[] {
        const files = readdirSync(this.workingDir, { withFileTypes: true });
        return files.flatMap((file) => {
            if (file.isFile()) {
                return parentDir ? `${parentDir}/${file.name}` : file.name;
            }
            return this.getAllFilesInWorkingDir(file.name);
        })
    }
}