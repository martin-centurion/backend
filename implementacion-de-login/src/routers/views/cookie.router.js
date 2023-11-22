import { Router } from 'express';

const router = Router();

router.post('/set-cookie', (req, res) => {
    const { name, email } = req.body;
    res
        .cookie(name, email, 'Esta es una prueba', { maxAge: 10000 })
        .redirect('/')
});

router.get('/get-cookie', (req, res) => {
    const cookies = req.cookies;
    res.status(200).json(cookies)
});

export default router;