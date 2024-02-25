import { Router } from 'express';
import CartController from '../../controllers/cart.controller.js';
import { authenticationMiddleware, authorizationMiddleware } from "../../utils.js";
import { loggerDev } from '../../config/logger.js';

const router = Router();

router.post('/carts/:cid/purchase', authenticationMiddleware('jwt'), CartController.purchaseCart);

router.get('/carts', authenticationMiddleware('jwt'), authorizationMiddleware(['user', 'admin']), async (req, res, next) => { 
  try {
    const { query } = req;
    const carts = await CartController.getCarts(query);
    res.status(201).json(carts);
  } catch (error) {
    next(error);
  }
});

router.get('/carts/:cid', authenticationMiddleware('jwt'), authorizationMiddleware(['user', 'admin']), async (req, res, next) => {
  const { cid } = req.params;
  try {
      const user = req.user;
      const cartId =user.cartId
      const result = await CartController.findById(cid);
      res.render('cart', buildResponse(cartId, result));
      //res.status(201).json({cid, result})
  } catch (error) {
      req.logger.error(error.message)
  }
});



router.post('/carts', authenticationMiddleware('jwt'), authorizationMiddleware(['user', 'admin']), async (req, res, next) => {
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

router.delete('/carts/:cid', authenticationMiddleware('jwt'), async (req, res, next) => {
  try {
      const { params: { cid } } = req;
      await CartController.deleteById(cid);
      res.status(204).end();
  } catch (error) {
      next(error)
  }
});

router.post('/carts/:cid/product/:pid', async (req, res, next)=>{
  try {
    const { cid, pid } = req.params;
    await CartController.addProductToCart(cid, pid);
    res.status(201).json("Producto adherido al carrito correctamente.");
    } catch (error) {
      next(error);
    }
});

export default router;