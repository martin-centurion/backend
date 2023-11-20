import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    if(!req.session.counter) {
        req.session.counter = 1;
        res.send('Bienvenido');
    } else {
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)
    }
});

const userTest = {
    username: 'mcenturion',
    password: '123456'
};

router.get('/login', (req, res) => {
    const { username, password } = req.query;
    if ( username === userTest.username && password === userTest.password) {
        req.session.user = username;
        req.session.admin = true;
        res.send('Inicio de sesion exitoso.')
    } else {
        res.send('Username y password incorrecto');
    }
});

const auth = (req, res, next) => {
    if (req.session.user && req.session.admin) {
        next();
    } else {
        res.status(401).send('No tienes permiso para acceder a esta ruta');
    }
}

// http://localhost:8080/login?username=mcenturion&password=123456

router.get('/private', auth, (req, res) => {
    res.send('Te damos la bienvenida a la sección privada.')
})

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.send('Ah ocurrido un error. ⛔️');
        } else {
            res.send('Session cerrada con exito.')
        }
    })
})

export default router;