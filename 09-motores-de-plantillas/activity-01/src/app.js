import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path'; 

import indexRouter from './routers/index.router.js';
import { __dirname, randomNumber } from './utils.js';

const app = express();

const users = [
    
	{	
        id: "d9732c83-1fa0-465a-89e0-c2dc7d049909",
		firstName: "Martin",
		lastName: "Centurion",
		age: 37,
		email: "mc@gmail.com"
	},
	{
		id: "43ba7b79-6574-41da-944e-ac649c9416f2",
		firstName: "Pablo",
		lastName: "Redolfi",
		age: 37,
		email: "pr@gmail.com"
	},
	{
		id: "63abd865-28d2-4b8f-a45c-fa2939abb2e0",
		firstName: "Daniel",
		lastName: "Avila",
		age: 33,
		email: "da@gmail.com"
	},
	{
		id: "0da8470c-10eb-4b51-80d9-2c2b550dc69e",
		firstName: "Angela",
		lastName: "Centurion",
		age: 58,
		email: "ac@gmail.com"
	},
	{
		id: "7a1250de-d45c-4df6-9fc9-66765a0bc3d6",
		firstName: "Ramiro",
		lastName: "Pucheta",
		age: 26,
		email: "rp@gmail.com"
	}
]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static' ,express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const position = randomNumber(0, users.length -1);
    const user = users[position];
    res.render('index', user)
})

app.use('/', indexRouter);

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
});

export default app;
