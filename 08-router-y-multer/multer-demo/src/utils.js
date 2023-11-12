import multer from 'multer';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.join(__dirname, '../public/img')
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()} - ${file.originalname}`;
        cb(null, filename);
    }
});

export const uploader = multer({ storage });