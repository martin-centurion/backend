import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";
//import serverSocket from "../server.js";

const router = Router();

    router.get('/products', async (req, res) => {
        let products = await ProductManager.get();
        res.render('products', { products: products.map(p => p.toJSON()) });
    });

    // router.get('/products/:prodId', async (req, res) => {
    //     const { prodId } = req.params;
    //     const product = allProducts.getProductById(prodId);
    //     if(!product) {
    //         res.status(404).json({ error: 'Producto no encontrado' });
    //     } else {
    //         res.json({ product })
    //     }
    // });

    // router.post('/products', async (req, res) => {
    //     try {
    //         const product = req.body;
    //         const addedProduct = await productManager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.status,product.category, product.stock);
    //         if(!addedProduct) {
    //             throw new Error('No se ha podido agregar el producto.')
    //         } else {
    //             serverSocket.emit('message', allProducts);
    //             res.status(201).json({ message: 'Producto agregado correctamente.'})
    //         }
    //     } catch (error) {
    //         res.status(400).json({ error: error.message })
    //     }
    // });

    // router.delete('/products/:prodId', async (req, res) => {
    //     try {
    //         const { prodId } = req.params;
    //         const productToEliminate = allProducts.deleteProduct(prodId);
    //         console.log(productToEliminate);
    //         res.status(201).json({ message: `Producto id ${prodId} ha sido eliminado correctamente.`})
    //     } catch (error) {
    //         res.status(400).json({ error: error.message })
    //     }
    // })


export default router;