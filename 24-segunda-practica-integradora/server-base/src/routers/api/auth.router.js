import { Router } from 'express';
import UserModel from '../../models/user.model.js';
import { createHash, verifyPassword, tokenGenerator } from '../../utils.js';

const router = Router();

router.post('/auth/register', async (req, res) => {
    const {
        first_name,
        last_name,
        dni,
        email,
        password
    } = req.body;
    if (
        !first_name ||
        !last_name ||
        !dni ||
        !email ||
        !password
    ) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.'})
    }
    let user = await UserModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'Correo ya registrado. Intenta recuperar contraseña. '})
    }
    user = await UserModel.create({
        first_name,
        last_name,
        dni,
        email,
        password: createHash(password),
    });
    res.status(201).json({ message: 'Usuario creado correctamente.'})
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: 'Correo o contraseña invalidos'});
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Correo o contraseña invalidos'});
    }
    const isValidPassword = verifyPassword(password, user);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Correo o contraseña invalidos'});
    }
    const token = tokenGenerator(user);
    res
        .status(200)
        .cookie('access_token', token, { maxAge: 60000, httpOnly: true, signed: true })
        .json({ message: 'Inicio de sesión exitoso.' });
})

export default router;