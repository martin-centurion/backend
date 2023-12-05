import { Router } from 'express';
import CartManager from '../../dao/CartManager.js';
import { 
    authenticationMiddleware,
    authorizationMiddelware
  } from "../../utils.js";
import CartModel from '../../models/cart.model.js';

const router = Router();

router.get('/carts', authenticationMiddleware('jwt'), authorizationMiddelware('user'), async (req, res) => {
    const carts = await CartModel.find({}).populate('user').populate('products.product');

    res.status(200).json(carts)
    //res.render('carts', carts);
});

router.post('/carts', authenticationMiddleware('jwt'), authorizationMiddelware('user'), async (req, res) => {
    const body = req.body;
    const cart = await CartModel.create({
        ...body,
        user: req.user.id,
    });
    res.status(201).json(cart);
});

router.get('/carts/:cid', async (req, res) => {
    const { params: { cid }} = req;
    try {
        const cart = await CartManager.getById(cid);
        res.render('carts', buildResponse(cid, cart));
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

const buildResponse = (cid, data) => {
    const payload = data.products.map(product => product.toJSON());
    console.log('payload', payload);
    return {
        cartId: cid,
        payload
    }
}


router.post('/carts/:cid/product/:pid', async (req, res) => {
    const { params: { pid, cid }} = req;
    const cart = await CartManager.addProductToCart(cid, pid);
    res.status(201).json(cart)
});

export default router;