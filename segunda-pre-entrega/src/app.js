import express from 'express';
import handlebars from 'express-handlebars';
import productViewRouter from './routers/views/products.router.js';
import productApiRouter from './routers/api/productsApi.router.js';
import cartViewRouter from './routers/views/carts.router.js';
import cartApiRouter from './routers/api/cartsApi.router.js';
import { __dirname } from './utils.js';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/api', productApiRouter, cartApiRouter)
app.use('/', productViewRouter, cartViewRouter);


export default app;