import { Router } from 'express';
import CartController from '../../controllers/cart.controller.js';
import CartModel from '../../models/cart.model.js';
import { 
    authenticationMiddleware,
    authorizationMiddelware
  } from "../../utils.js";

const router = Router();

router.get('/carts', authenticationMiddleware('jwt'), async (req, res) => {
    const carts = await CartModel.find().populate('user').populate('products.product');
    const criteria = {};
    const cart = await CartModel.paginate(criteria);
    res.status(201).json(cart);
});

router.post('/carts', authenticationMiddleware('jwt'), async (req, res, next) => {
  try {
    const body = req.body;
    const cart = await CartController.create({
        ...body,
        user: req.user.id,
    });
    res.status(201).json(cart);
  } catch (error) {
    next(error)
  }
});
router.get('/carts/:cid', authenticationMiddleware('jwt'), async (req, res) => {
  const { cid } = req.params;
  try {
      const result = await CartController.getById(cid)
      console.log('result', result);
      res.status(201).json({cid, result})
  } catch (error) {
      console.log('Error', error.message);
  }
});

router.post('/carts/:cid/product/:pid', async (req, res, next)=>{
    const { cid, pid } = req.params;

  try {
    const result = await CartController.addProductToCart(cid, pid);
    res.status(201).json("Producto adherido al carrito correctamente.");
    } catch (error) {
      next(error);
    }
});

export default router;