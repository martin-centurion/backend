class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      const existingProduct = this.products.find((product) => product.code === code);
      if (existingProduct) {
        throw new Error("El código de producto ya está en uso.");
      }
  
      const productId = this.createIdProduct();
  
      const newProduct = {
        id: productId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
  
      return newProduct;
    }
  
    getProductById(productId) {
      const product = this.products.find((product) => product.id === productId);
      if (!product) {
        throw new Error("Producto no encontrado.");
      }
      return product;
    }
  
    createIdProduct() {
      return Date.now().toString();
    }
  }
  
  const productManager = new ProductManager();
  
  const products = productManager.getProducts();
  console.log("Productos iniciales:", products);
  
  try {
    const newProduct = productManager.addProduct(
      "producto prueba",
      "Este es un producto prueba",
      200,
      "Sin imagen",
      "abc123",
      25
    );
    console.log("Producto agregado:", newProduct);
  } catch (error) {
    console.error("Error al agregar el producto:", error.message);
  }
  
  const updatedProducts = productManager.getProducts();
  console.log("Productos actualizados:", updatedProducts);
  
  try {
    productManager.addProduct(
      "producto repetido",
      "Este es un producto repetido",
      150,
      "Sin imagen",
      "abc123",
      10
    );
    console.log("Producto repetido agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el producto repetido:", error.message);
  }
  
  try {
    const productIdToFind = updatedProducts[0].id;
    const foundProduct = productManager.getProductById(productIdToFind);
    console.log("Producto encontrado por ID:", foundProduct);
  } catch (error) {
    console.error("Error al buscar el producto por ID:", error.message);
  }
  
