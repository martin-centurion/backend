import express from 'express';
import expressSession from 'express-session';
import path from 'path'; 
import { __dirname } from './utils.js';

import indexRouter from './routers/index.router.js';

const app = express();

const SESSION_SECRET = '5(HWwTw%£_Q%<&RMEEiK6r7tLg]-$l@o';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(expressSession({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));

app.use('/', indexRouter);

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
});

export default app;
