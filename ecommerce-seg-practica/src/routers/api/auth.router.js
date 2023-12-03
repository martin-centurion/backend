import { Router } from "express";
import passport from "passport";
import { 
    isValidPassword, 
    tokenGenerator, 
    verifyToken,
    authenticationMiddleware,
    authorizationMiddelware
} from "../../utils.js";
import UserModel from "../../models/user.model.js";
import ProductModel from "../../models/product.model.js";

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
});

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
      .redirect('/products');
  
  });
  
  export default router;