import { Router } from "express";
import ProductManager from "../classes/productManager.js";
import serverSocket from "../server.js";

const productManager = new ProductManager('./src/products.json');
const allProducts = await productManager.getProducts();
const ProductsRouter = Router();

    ProductsRouter.get('/products', async (req, res) => {
        const limit = req.query.limit;
        const products = allProducts;
        if(!limit) {
        res.json(products);
        } else {
        res.json({ products: products.slice(0, parseInt(limit)) });
        }
    });

    ProductsRouter.get('/products/:prodId', async (req, res) => {
        const { prodId } = req.params;
        const product = allProducts.getProductById(prodId);
        if(!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json({ product })
        }
    });

    ProductsRouter.post('/products', async (req, res) => {
        try {
            const product = req.body;
            const addedProduct = await productManager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.status,product.category, product.stock);
            if(!addedProduct) {
                throw new Error('No se ha podido agregar el producto.')
            } else {
                serverSocket.emit('message', allProducts);
                res.status(201).json({ message: 'Producto agregado correctamente.'})
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    });

    ProductsRouter.delete('/products/:prodId', async (req, res) => {
        try {
            const { prodId } = req.params;
            const productToEliminate = allProducts.deleteProduct(prodId);
            console.log(productToEliminate);
            res.status(201).json({ message: `Producto id ${prodId} ha sido eliminado correctamente.`})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })


export { ProductsRouter, allProducts };