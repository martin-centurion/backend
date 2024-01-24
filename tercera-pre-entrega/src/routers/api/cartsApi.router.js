import { Router } from 'express';
import CartManager from '../../dao/CartManager.js';

const router = Router();

router.get('/carts', async (req, res) => {
    const { query = {} } = req;
    const carts = await CartManager.get(query);
    res.status(200).json(carts);
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

router.post('/carts', async (req, res) => {
    const { body } = req;
    const cart = await CartManager.create(body);
    res.status(201).json(cart);
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
    const { params: { pid, cid }} = req;
    const cart = await CartManager.addProductToCart(cid, pid);
    res.status(201).json(cart)
});

export default router;