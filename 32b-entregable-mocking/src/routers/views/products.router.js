import { Router } from 'express';


const router = Router();

router.get('/products', async (req, res) => {
    let products = await ProductManager.get();
    res.render('products', { products: products.map(p => p.toJSON()), title: 'Productos' });
});

export default router;