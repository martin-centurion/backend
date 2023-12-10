import { Router } from 'express';
import CartManager from '../../dao/CartManager.js';
import { 
    authenticationMiddleware,
    authorizationMiddelware
  } from "../../utils.js";
import CartModel from '../../models/cart.model.js';

const router = Router();

router.get('/carts', authenticationMiddleware('jwt'), authorizationMiddelware('user'), async (req, res) => {
    const carts = await CartModel.find().populate('user').populate('products.product');
    const { first_name, last_name, role } = req.user;
    console.log('cart', carts);
    const criteria = {};
    const cart = await CartModel.paginate(criteria);
    res.render('carts', buildResponse({ ...cart, first_name, last_name, role  }));
});

router.post('/carts', authenticationMiddleware('jwt'), authorizationMiddelware('user'), async (req, res) => {
    const body = req.body;
    const cart = await CartModel.create({
        ...body,
        user: req.user.id,
    });
    res.status(201).json(cart);
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
    const { params: { pid, cid }} = req;
    const cart = await CartManager.addProductToCart(cid, pid);
    res.status(201).json(cart)
});

router.get('/carts/:cid', authenticationMiddleware('jwt'), async (req, res) => {
  const { cid } = req.params;
  try {
      const result = await CartModel.findById(cid)
      res.render('carts', buildResponse(cid, result))
  } catch (error) {
      console.log('Error', error.message);
  }
});

const buildResponse = (data) => {
  return {
    status: 'success',
    payload: data.docs.map(product => product.toJSON({})),
    userName: data.first_name,
    userLastName: data.last_name,
    userRole: data.role,
  }
}

export default router;