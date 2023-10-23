import express from 'express';
import handlebars from 'express-handlebars';
import { ProductsRouter, allProducts }from './routers/products.router.js';
import CartRouter from './routers/cart.router.js';
import path from 'path';

import { __dirname } from './utils.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/api', ProductsRouter, CartRouter);

app.get('/', (req, res) => {
    const emptyProducts = allProducts.length === 0;
    res.render('index', { allProducts, emptyProducts });
});

app.get('/realtimeproducts', (req, res) => {
    const empty = allProducts.length === 0;
    res.render('realtimeproducts', empty);
})

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message});
});

export default app;