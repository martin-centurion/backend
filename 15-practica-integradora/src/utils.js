import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __direname = path.dirname(__filename);

export class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
};