import express from 'express';
import path from 'path'; 
import { __dirname } from './utils.js';
import cookieParser from 'cookie-parser';

import indexRouter from './routers/index.router.js';

const app = express();

const COOKIE_SECRET = '5(HWwTw%£_Q%<&RMEEiK6r7tLg]-$l@o';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser(COOKIE_SECRET));

app.use('/', indexRouter);

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
});

export default app;
