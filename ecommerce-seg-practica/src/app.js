import express from 'express';
import passport from 'passport';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import authRouter from './routers/api/auth.router.js';
import indexRouter from './routers/api/index.router.js';
import productApiRouter from './routers/api/productsApi.router.js';
import cartApiRouter from './routers/api/cartsApi.router.js';
import { init as initPassportConfig } from './config/passport.config.js';

import { __dirname } from './utils.js';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassportConfig();
app.use(passport.initialize());

app.use('/', 
    authRouter,
    indexRouter,
    productApiRouter,
    cartApiRouter, 
    );


export default app;