/* 

DESAFÍO ENTREGABLE - PROCESO DE TESTING

Clases con ECMAScript y ECMAScript avanzado
Se creará una instancia de la clase “ProductManager”
Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
Se llamará al método “addProduct” con los campos:
title: “producto prueba”
description:”Este es un producto prueba”
price:200,
thumbnail:”Sin imagen”
code:”abc123”,
stock:25
El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

*/

class ProductManager {
    constructor() {
      this.products = [];
    }
  
    generateUniqueId() {
      // Función para generar un ID único
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Comprobar si el código ya existe en algún producto
      const existingProduct = this.products.find(product => product.code === code);
      if (existingProduct) {
        throw new Error("El código de producto ya está en uso.");
      }
  
      const id = this.generateUniqueId();
      const product = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
  
      return product;
    }
  
    getProductById(productId) {
      const product = this.products.find(product => product.id === productId);
      if (!product) {
        throw new Error("Producto no encontrado.");
      }
      return product;
    }
  }
  
  // Crear una instancia de ProductManager
  const productManager = new ProductManager();
  
  // Obtener productos (debe devolver un arreglo vacío)
  console.log(productManager.getProducts()); // []
  
  // Agregar un producto
  const newProduct = productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  console.log(newProduct); // Debería mostrar el producto agregado
  
  // Obtener productos nuevamente (ahora debería contener el producto agregado)
  console.log(productManager.getProducts());
  
  // Intentar agregar el mismo producto nuevamente (debe arrojar un error)
  try {
    productManager.addProduct(
      "producto prueba",
      "Este es un producto prueba",
      200,
      "Sin imagen",
      "abc123",
      25
    );
  } catch (error) {
    console.error(error.message); // Debería mostrar "El código de producto ya está en uso."
  }
  
  // Obtener un producto por ID
  try {
    const foundProduct = productManager.getProductById(newProduct.id);
    console.log(foundProduct);
  } catch (error) {
    console.error(error.message); // Debería mostrar el producto encontrado o un mensaje de error si no se encuentra.
  }
  