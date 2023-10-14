import { Router } from "express";

const router = Router();

router.post('/users', (req, res) => {
    const { body } = req;

    const newUser = {
        id: Date.now(),
        ... body,
    }
    res.json({ 
        status: 'Success',
        message: 'Usuario creado correctamente',
        payload: newUser,
    });
})

export default router;