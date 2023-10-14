import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import indexRouter from './routers/index.router.js';
import { __dirname, randonNumber } from './utils.js';

const app = express();

const users = [
    {id: 'sdfsdafdfg', firstName: 'Rick', lastName: 'Sanchez', age: 70, email: 'rs@gmail.com'},
    {id: '2sdfasdfdsaf', firstName: 'Morty', lastName: 'Smith', age: 14, email: 'ms@gmail.com'},
    {id: '3sdfdsafdsaf', firstName: 'Summer', lastName: 'Sanchez', age: 18, email: 'ss@gmail.com'},
    {id: '4sdfsdafdsaf', firstName: 'Beth', lastName: 'Sanchez', age: 35, email: 'bs@gmail.com'},
    {id: '5sdafsadfadsf', firstName: 'Jerry', lastName: 'Sanchez', age: 35, email: 'js@gmail.com'},
]

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const position = randonNumber(0, users.length -1);
    const user = users[position];
    res.render('index', user)
})

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message});
});

export default app;