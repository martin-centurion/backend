import express from 'express';
import path from 'path'; 
import { fileURLToPath } from 'url';
import morgan from 'morgan';

import userRouter from './routers/users.router.js';
import petsRouter from './routers/pets.router.js';

const __filename = fileURLToPath(import.meta.url);
console.log('__filename', __filename);

const __dirname = path.dirname(__filename);
console.log('__dirname', __dirname);

const app = express();
const PORT = 8080;

//mid
const middleware = (req, res, next) => {
    const today = new Date();
    const message = `${today.toLocaleDateString()} - ${today.toLocaleTimeString()}`;
    console.log(message);
    next();
};

// middleware a nivel de aplicacion
//app.use(middleware);

app.use(morgan('dev'));
app.use(express.json()); // middleware incorporado
app.use(express.urlencoded({ extended: true }));
app.use('/static' ,express.static(path.join(__dirname, '../public')));

// middleware a nivel de endpoint
app.get('/demo', middleware, (req, res) => {
    throw new Error('Error de prueba');
    res.send('Esta es una prueba');
})
app.use('/api', userRouter, petsRouter);

const errorHandler = (error, req, res, next) => {
    console.error(`Ah ocurrido un error: ${error.message}`);
    res.status(500).send('Algo se rompio') // Status(500) cuando es un error que no estamos controlando
};

// middleware de terceros

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})
