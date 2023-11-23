import express from 'express';
import handlebars from 'express-handlebars';
import productViewRouter from './routers/views/products.router.js';
import productApiRouter from './routers/api/productsApi.router.js';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import { URI } from './db/mongodb.js';
import cartViewRouter from './routers/views/carts.router.js';
import cartApiRouter from './routers/api/cartsApi.router.js';

import sessionRouter from './routers/views/sessions.router.js';

import { __dirname } from './utils.js';
import path from 'path';

const SESSION_SECRET = '5(HWwTw%£_Q%<&RMEEiK6r7tLg]-$l@o';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(expressSession({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: URI,
        mongoOptions: {},
        ttl: 120
    })
}));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', cartApiRouter);
app.use('/', productApiRouter)
app.use('/', productViewRouter, cartViewRouter);

app.use('/', sessionRouter);

export default app;