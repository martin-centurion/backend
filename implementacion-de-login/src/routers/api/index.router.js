import { Router } from "express";

const router = Router();

const privateRouter = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    };
    next();
};

const publicRouter = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/profile');
    };
    next();
};

router.get('/profile', privateRouter, (req, res) => {
    res.render('profile', { title: 'Perfil', user: req.session.user });
});

router.get('/', publicRouter, (req, res) => {
    res.render('login', { title: 'Login' });
});

router.get('/register', publicRouter, (req, res) => {
    res.render('register', { title: 'Register' });
});


export default router;