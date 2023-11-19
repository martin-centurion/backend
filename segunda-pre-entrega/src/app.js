import express from 'express';
import handlebars from 'express-handlebars';
import productViewRouter from './routers/views/products.router.js';
import { __dirname } from './utils.js';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.send('<h1>Segunda pre entrega</h1>')
});

app.use('/home', (req, res) => {
    res.render('index');
});

app.use('/products', productViewRouter);


export default app;