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
    console.log('cart', carts);
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

/*   */

router.post('/carts/:cid/product/:pid', async (req, res, next)=>{
    try {
      const { params: { pid, cid }}= req;
      const cart = await CartController.addProductToCart(cid, pid);
      res.status(201).json({ pid, cid });
    } catch (error) {
      next(error);
    }
});


/* const buildResponse = (data) => {
  return {
    status: 'success',
    payload: data.docs.map(product => product.toJSON({})),
    userName: data.first_name,
    userLastName: data.last_name,
    userRole: data.role,
  }
} */

export default router;