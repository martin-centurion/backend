import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import { __direname } from './utils.js';
import studentsApiRouter from './routers/api/students.router.js';
import studentViewsRouter from './routers/views/students.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__direname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__direname, 'views'));
app.set('view engine', 'handlebars');

//Routers
app.get('/', (req, res) => {
    res.send('Practica')
});

app.use('/api', studentsApiRouter);
app.use('/', studentViewsRouter);

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error inesperado: ${error.message}`;
    console.error(message);
    res.status(500).json({ message });
});

export default app;
