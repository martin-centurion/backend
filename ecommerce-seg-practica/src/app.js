import express from 'express';
import passport from 'passport';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import { URI } from './db/mongodb.js';
import cookieParser from 'cookie-parser';
import productViewRouter from './routers/views/products.router.js';
import productApiRouter from './routers/api/productsApi.router.js';
import cartViewRouter from './routers/views/carts.router.js';
import cartApiRouter from './routers/api/cartsApi.router.js';
import indexRouter from './routers/api/index.router.js';
import sessionRouter from './routers/api/sessions.router.js';
import clientRouter from './routers/api/client.router.js';
import { init as initPassportConfig } from './config/passport.config.js';

import { __dirname } from './utils.js';
import path from 'path';
import { log } from 'console';

const SESSION_SECRET = process.env.KEY_SESSION_SECRET;
console.log(SESSION_SECRET);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());


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

initPassportConfig();

app.use(passport.initialize());
app.use(passport.session());

app.use('/', cartApiRouter);
app.use('/', productApiRouter)
app.use('/', productViewRouter, cartViewRouter);
app.use('/', indexRouter);
app.use('/api', sessionRouter);

app.use('/', clientRouter);


export default app;