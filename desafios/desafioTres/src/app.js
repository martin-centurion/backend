const express = require('express');
const fs = require('fs');
const productsJSON = require('./products.json') 

const products = productsJSON;
const app = express();

app.use(express.urlencoded({ extended: true }));


app.get('/products', (req, res) => {
    const limit = req.query.limit;
  
    fs.readFile('products.json', 'utf8', (err, data) => {
      if (err) {
        return res.json({ error: 'Error al leer el archivo de productos' });
      }
  
      let products = JSON.parse(data);
  
      if (limit) {
        products = products.slice(0, parseInt(limit));
      }
  
      res.json({ products });
    });
  });

app.get('/products/:prodId', (req, res) => {
    const { prodId } = req.params;
    const product = products.find (product => product.id === parseInt(prodId))
    if (!product) {
        res.send({error: 'Producto no encontrado'})
    } else {
        res.send({product})
    }
});

app.listen(8080, () =>{
    console.log('Servidor escuchando desde el puerto 8080')
});