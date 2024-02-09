import express from 'express';
import passport from 'passport';
import handlebars from 'express-handlebars';
import { init as initPassportConfig } from './config/passport.config.js';
import expressCompression from 'express-compression';
import { addLogger } from './config/logger.js';

// Api
import cookieParser from 'cookie-parser';
import authRouter from './routers/api/auth.router.js';
import userRouter from './routers/api/user.router.js';
import productApiRouter from './routers/api/productsApi.router.js';
import cartApiRouter from './routers/api/cartsApi.router.js';
import emailRouter from './routers/api/email.router.js';

// Loger

import loggerRouter from './routers/api/logger.router.js'

//Views

import { __dirname } from './utils.js';
import path from 'path';

const app = express();

app.use(addLogger)
app.use(expressCompression({
    brotli: { enabled: true, zlib: {}}
}));
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
    userRouter,
    productApiRouter,
    cartApiRouter,
    emailRouter,
    loggerRouter
    );



export default app;