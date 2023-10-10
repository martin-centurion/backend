import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routers/users.router.js';
import petsRouter from './routers/pets.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 8080;

//console.log('__dirname', __dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//console.log('Concatenacion', __dirname + '../public'); // Se rompe la ruta
//console.log('path.join', path.join(__dirname, '../public')); // Se crear una ruta valida
app.use('/static', express.static(path.join(__dirname, '../public')));

app.use('/api', userRouter, petsRouter);

app.listen(PORT, () => {
    console.log(`Server is runnimg on http://localhost:${PORT}`);
});