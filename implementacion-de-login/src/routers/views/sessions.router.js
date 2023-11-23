import { Router } from 'express';

const router = Router();

const userTest = {
    username: 'mcenturion',
    password: '1234'
}

router.get('/sessions', (req, res) => {
    if (!req.session.counter) {
        req.session.counter = 1;
        res.send('Bienvenido')
    } else {
        req.session.counter++;
        res.send(`Visitas: ${req.session.counter}`)
    }
});

// http://localhost:8080/login?username=mcenturion&password=1234

router.get('/login', (req, res) => {
   const { username, password } = req.query;
   if (username ===  userTest.username && password === userTest.password) {
        req.session.user = username;
        req.session.admin = true;
        res.send('Inicio de sesion oki!')
   } else {
        res.send('Username y password incorrecto.')
   };
});

const auth = (req, res, next ) => {
    if (req.session.user && req.session.admin) {
        next();
    } else {
        res.status(401).send('No tienes permiso.')
    }
};

router.get('/private', auth, (req, res) => {
    res.send('Te damos la bienvenida.')
});

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.send('Error')
        } else {
            res.send('Sesion cerradad con exito')
        }
    })
})

export default router;