import { Router } from "express";

const router = Router();

router.post('/users', (req, res) => {
    const { body } = req;
    const newUser = {
        id: Date.now(),
        ... body,
    };
    res.json({ 
        status: 'sucess',
        payload: newUser,
        message: 'Usuario creado correctamente.',
});
});

export default router;