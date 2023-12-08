import { Router } from "express";
import { fork } from 'child_process';

const router = Router();

router.get('/', (req, res) => {
    res.send('<h1>Hello People</h1>')
});

router.get('/operation', (req, res) => {
    const child = fork('./src/routers/operation.js');
    child.send('Inicia el calculo, por favor.');
    child.on('message', (result) => {
        res.send(`<h1>Resultado: ${result}</h1>`);
    })
});

export default router;