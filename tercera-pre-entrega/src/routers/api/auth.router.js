import { Router } from "express";
import { 
    isValidPassword, 
    tokenGenerator, 
    createHash
} from "../../utils.js";
import UserModel from "../../models/user.model.js";
import AuthController from "../../controllers/auth.controller.js";
import EmailService from "../../services/email.service.js";
import path from 'path';
import { __dirname } from "../../utils.js";

const router = Router();

router.post('/auth/login', async (req, res) => {
  const { body: { email, password } } = req;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Email o pass invalidos.' });
  }
  const isValidPass = isValidPassword(password, user);
  if (!isValidPass) {
    return res.status(401).json({ message: 'Email o pass invalidos.' });
  }
  const token = tokenGenerator(user);
  res
    .cookie('access_token', token, {
      maxAge: 60000,
      httpOnly: true,
    })
    .status(200)
    .json({ status: 'succes'})
});

router.post('/auth/register', async (req, res) => {
  try {
      const user = await AuthController.register(req.body);
      res.status(201).json({ message: 'Usuario creado correctamente.' });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

router.post('/auth/recovery-password', async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
      return res.status(401).send('Correo o contraseña invalidos.')
  };
  await UserModel.updateOne({ email }, { $set: { password: createHash(newPassword) }});
  res.redirect('/login');
});

// Practica clase 30: Mailing Mensajeria
// twilio: XWQ8AR7EFPJV9AEUQGEDDBAF

const urlRecoveryPassStep2 = 'https://google.com.ar';

router.post('/auth/pass-email', async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = EmailService.sendEmail(
      email,
      'Recuperacion de contraseña',
      `
        <div>
            <h1>Recuperar contraseña</h1>
            <p>Debes acceder al siguiente enlace: <a href="${urlRecoveryPassStep2}">Link</a></p>
            <img src="cid:pantalla-001" />
        </div>,
      `,
      [
        {
            filename: 'img-pantalla.png',
            path: path.join(__dirname, './images/pantalla.png'),
            cid: 'pantalla-001'
        }
      ]
    );
    console.log('result', result);
    res.status(200).json({ message: 'correo enviado correctamente' })
  } catch (error) {
    next(error);
  }
})
    
export default router;