import { Router } from "express";
import { 
    isValidPassword, 
    tokenGenerator, 
    createHash
} from "../../utils.js";
import UserModel from "../../models/user.model.js";
import AuthController from "../../controllers/auth.controller.js";

const router = Router();

router.post('/auth/login', async (req, res) => {
  try {
    const token = await AuthController.login(req.body);
    console.log('token', token);
      res
        .cookie('access_token', token, {
          maxAge: 60000,
          httpOnly: true,
        })
        .status(200)
        .redirect('/products')
        //.json({ status: 'succes'})
  } catch (error) {
    //res.redirect('/')
    res.status(404).json({ message: error.message })
  }
  
  
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
  try {
    const user = await AuthController.recovery(req.body);
    res.status(201).json({ message: 'Contraseña actualizada.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  /* const { email, newPassword } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
      return res.status(401).send('Correo o contraseña invalidos.')
  };
  await UserModel.updateOne({ email }, { $set: { password: createHash(newPassword) }});
  res.status(400).json({ message: error.message }); */
  //res.redirect('/login');
});


export default router;