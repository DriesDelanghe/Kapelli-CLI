
export class FileNotFoundException extends Error {

    name: string = 'FileNotFoundException';

    constructor(public message: string) {
        super(message);
    }
}