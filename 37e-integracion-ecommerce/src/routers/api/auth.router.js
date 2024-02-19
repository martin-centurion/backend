import { Router } from "express";
import AuthController from "../../controllers/auth.controller.js";
import { loggerDev } from "../../config/logger.js";

const router = Router();

router.post('/auth/login', async (req, res) => {
  try {
    const token = await AuthController.login(req.body);
      res
        .cookie('access_token', token, {
          maxAge: 60000,
          httpOnly: true,
        })
        .status(200)
        .json({ status: 'succes'})
        //.redirect('/products')
  } catch (error) {
    //res.redirect('/')
    res.status(404).json({ message: error.message })
    loggerDev.error(error.cause);
  }
  
  
});

router.post('/auth/register', async (req, res) => {
  try {
      const user = await AuthController.register(req.body);
      res.status(201).json({ message: 'Usuario creado correctamente.' });
  } catch (error) {
      res.status(400).json({ message: error.message });
      loggerDev.error(error.cause);
  }
});


router.post('/auth/recovery-password', async (req, res) => {
  try {
    const user = await AuthController.recovery(req.body);
    res.status(201).json({ message: 'Contraseña actualizada.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export default router;