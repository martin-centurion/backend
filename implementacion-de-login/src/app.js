import express from 'express';
import handlebars from 'express-handlebars';
import productViewRouter from './routers/views/products.router.js';
import productApiRouter from './routers/api/productsApi.router.js';
import cookieParser from 'cookie-parser';
import cartViewRouter from './routers/views/carts.router.js';
import cartApiRouter from './routers/api/cartsApi.router.js';
import cookieRouter from './routers/views/cookie.router.js';

import { __dirname } from './utils.js';
import path from 'path';

const COOKIE_SECRET = '5(HWwTw%£_Q%<&RMEEiK6r7tLg]-$l@o';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser(COOKIE_SECRET));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', cartApiRouter);
app.use('/', productApiRouter)
app.use('/', productViewRouter, cartViewRouter);

app.use('/', cookieRouter);


export default app;