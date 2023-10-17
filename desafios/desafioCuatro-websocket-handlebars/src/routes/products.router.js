import { Router } from "express";
import ProductManager from "../classes/productManager.js";

const productManager = new ProductManager('./src/products.json');
const ProductsRouter = Router();

    ProductsRouter.get('/products', async (req, res) => {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if(!limit) {
        res.json({ products });
        } else {
        res.json({ products: products.slice(0, parseInt(limit)) });
        }
    });

    ProductsRouter.get('/products/:prodId', async (req, res) => {
        const { prodId } = req.params;
        const product = await productManager.getProductById(prodId);
        if(!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json({ product })
        }
    });

    ProductsRouter.post('/products', (req, res) => {
        try {
            const productData = req.body;
            productManager.addProduct(productData);
            res.status(201).json({ message: 'Producto agregado correctamente.'})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    });

    ProductsRouter.delete('/products/:prodId', async (req, res) => {
        try {
            const { prodId } = req.params;
            const productToEliminate = await productManager.deleteProduct(prodId);
            console.log(productToEliminate);
            res.status(201).json({ message: `Producto id ${prodId} ha sido eliminado correctamente.`})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })


export default ProductsRouter;