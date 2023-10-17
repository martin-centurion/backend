import { Router } from "express";
import CartManager from "../classes/cartManager.js";
import ProductManager from "../classes/productManager.js";

const productManager = new ProductManager('./src/products.json')
const cartManager = new CartManager('./src/cart.json');
const CartRouter = Router();

    CartRouter.post('/cart', async (req, res) => {
        const newCart = await cartManager.addCart();
        try {
            return res.status(201).json({ Carts: newCart, message: `Se agrego un nuevo carrito con el id: ${newCart.id} a la base de dato`})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })

    CartRouter.get('/cart', async (req, res) => {
        const carts = await cartManager.getCarts();
        res.json({ carts });
    });

    CartRouter.get('/cart/:cartId', async (req, res) => {
        const { cartId } = req.params;
        const cart = await cartManager.getCartById(cartId);
        if(!cart) {
            res.status(404).json({ error: 'Carrito no encontrado'});
        } else {
            res.json({ cart })
        }
    });

    CartRouter.post('/cart', (req, res) => {
        try {
            const cartData = req.body;
            cartManager.addCart(cartData);
            res.status(201).json({ message: 'Carrito agregado correctamente.'})
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    CartRouter.post('/cart/:cartId/product/:prodId', async (req, res) => {
        const { cartId } = req.params;
        const { prodId } = req.params;
        res.send(await cartManager.addProductInCart(cartId, prodId))
    })

export default CartRouter;