import { Router } from "express";
import { 
    isValidPassword, 
    tokenGenerator, 
    createHash
} from "../../utils.js";
import UserModel from "../../models/user.model.js";

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
  const {
    first_name,
    last_name,
    age,
    email,
    password,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !age ||
    !email ||
    !password
  ) {
    return res.status(400).json({ message: 'Todos los campos son requeridos 😨' });
  }
  let user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'Correo ya registrado 😨. Intenta recuperar tu contraseña 😁.' });
  }
  user = await UserModel.create({
    first_name,
    last_name,
    age,
    email,
    password: createHash(password),
  });
  res.redirect('/login');
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
    
export default router;