import { Router } from 'express';

const router = Router();

router.get('/set-cookie', (req, res) => {
    res
        .cookie('coder-house-cookie', 'Esta es una prueba', { maxAge: 10000 })
        .send('Cookie Ok!')
});

router.get('/get-cookie', (req, res) => {
    const cookies = req.cookies;
    res.send(cookies)
});

router.get('/delete-cookie', (req, res) => {
    res.clearCookie('coder-house-cookie');
    res.send('La cookie fue borrada con exito');
});


export default router;