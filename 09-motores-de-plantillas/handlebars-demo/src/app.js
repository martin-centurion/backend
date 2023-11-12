import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path'; 

import indexRouter from './routers/index.router.js';
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static' ,express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const user = {
        id: "e9edb299-ceab-43d2-bc04-9be1d69e901d",
        firstName: "Snowball",
        lastName: "Maltez",
        age: 3,
        email: "sm@gmail.com"
    };
    res.render('index', user)
})

app.use('/', indexRouter);

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
});

export default app;
