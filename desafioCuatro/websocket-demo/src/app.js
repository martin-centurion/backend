import express from 'express';
import handlebars from 'express-handlebars';
import { ProductsRouter, allProducts }from './routers/products.router.js';
import CartRouter from './routers/carts.router.js';
import productApiRouter from './routers/api/products.routers.js';
import productViewRouter from './routers/views/products.router.js';
import cartApiRouter from './routers/api/cart.router.js';
import cartViewsRouter from './routers/views/cart.router.js';
import MessageViewsRouter from './routers/views/chats.router.js';
import chatRouter from './routers/api/chat.router.js';
import path from 'path';

import { __dirname } from './utils.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//app.use('/api', ProductsRouter, CartRouter);
app.use('/api', productApiRouter, cartApiRouter);
app.use('/', productViewRouter, cartViewsRouter, MessageViewsRouter);
app.use('/', chatRouter)
//chat router

//app.get('/', (req, res) => {
//    const emptyProducts = allProducts.length === 0;
//    res.render('index', { allProducts, emptyProducts });
//});

app.get('/realtimeproducts', (req, res) => {
    const empty = allProducts.length === 0;
    res.render('realtimeproducts', empty);
});

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message});
});

export default app;