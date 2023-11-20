import { Router } from "express";

const router = Router();

// http://localhost:8080?name=Martin

router.get('/', (req, res) => {
    const { name } = req.query;
    if (!req.session.counter) {
        req.session.counter = 1;
        res.send(`Le damos la bienvenida ${name || ''}`);
    } else {
        req.session.counter++;
        res.send(`${name || 'Es'} es tu visita # ${req.session.counter}`)
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.send('Ah ocurrido un error. ⛔️');
        } else {
            res.send('Session cerrada con exito.')
        }
    })
});

export default router;