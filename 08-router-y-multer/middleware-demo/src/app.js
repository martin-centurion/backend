import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

import userRouter from './routers/users.router.js';
import petsRouter from './routers/pets.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 8080;

//Middleware a nivel de aplicación
const middleware = (req, res, next) => {
    const today = new Date();
    const message = `Dia: ${today.toLocaleDateString()} - Hora: ${today.toLocaleTimeString()}`;
    console.log(message);
    next();
};

const middleware2 = (req, res, next) => {
    const today = new Date();
    const message = `Dia: ${today.toLocaleDateString()} - Hora: ${today.toLocaleTimeString()}`;
    req.message = message;
    next();
};
//app.use(middleware);

app.use(morgan('dev'));
app.use(express.json()); // Middleware incorporado, ya vienen incoporado con express
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '../public')));

//Middleware a nivel de endpoint, se pueden añadir dentro de las rutas de la aplicación -->
app.get('/demo', middleware, middleware2, (req, res) => {
    throw new Error('Error de prueba');
    res.send(`Esta es una prueba > ${req.message}`);
})
app.use('/api', userRouter, petsRouter);
// ---|

const errorHandler = (error, req, res, next) => {
    console.error(`A ocurrido un error: ${error.message}`);
    res.status(500).send('Algo se rompio. Intente más tarde');
};

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is runnimg on http://localhost:${PORT}`);
});