import { Router } from 'express';
import ProductManager from '../../dao/ProductManager.js';

const router = Router();

router.get('/products', async (req, res) => {
    let products = await ProductManager.get();
    res.render('index', { products: products.map(p => p.toJSON()) });
});

export default router;