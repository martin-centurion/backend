import { Router } from "express";

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' })
});

router.get('/logout', (req, res) => {
    res.clearCookie('access_token').redirect('login')
});

router.get('/recovery-password', (req, res) => {
    res.render('recovery-password', { title: 'Recuperar Contraseña'})
})

/* router.get('/recovery-password', publicRouter, (req, res) => {
    res.render('recovery-password', { title: 'Recuperar Contraseña' });
}); */


export default router;