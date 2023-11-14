const express = require('express');
const ProductManager = require('./productManager.js');

const app = express();
const PORT = 8080;

const productManager = new ProductManager('./src/products.json');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if(!limit) {
      res.json({ products });
    } else {
      res.json({ products: products.slice(0, parseInt(limit)) });
    }
  });

app.get('/products/:prodId', async (req, res) => {
    const { prodId } = req.params;
    const product = await productManager.getProductById(prodId);
    if (!product) {
        res.status(404).json({error: 'Producto no encontrado'})
    } else {
        res.json({ product })
    }
});

app.post('/products', (req, res) => {
  try {
    const productData = req.body;
    productManager.addProduct(productData);
    res.status(201).json({ message: 'Producto agregado correctamente.'})
  } catch (error) {
    res.status(400).json({ error: error.message });
    
  }
});

app.listen(PORT, () =>{
    console.log(`Server running in http://localhost:${PORT}`)
});