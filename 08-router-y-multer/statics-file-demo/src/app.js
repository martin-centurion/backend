import express from 'express';
import path from 'path'; 
import { fileURLToPath } from 'url';

import userRouter from './routers/users.router.js';
import petsRouter from './routers/pets.router.js';

const __filename = fileURLToPath(import.meta.url);
console.log('__filename', __filename);

const __dirname = path.dirname(__filename);
console.log('__dirname', __dirname);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static' ,express.static(path.join(__dirname, '../public')));

app.use('/api', userRouter, petsRouter);

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})
