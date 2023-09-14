class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Verificar si el código ya existe en algún producto
      const existingProduct = this.products.find((product) => product.code === code);
      if (existingProduct) {
        throw new Error("El código de producto ya está en uso.");
      }
  
      // Generar un ID único para el nuevo producto
      const productId = this.generateUniqueId();
  
      // Crear un objeto de producto
      const newProduct = {
        id: productId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      // Agregar el producto al arreglo
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
  
    generateUniqueId() {
      // Esta función debería generar un ID único, por ejemplo, usando un contador o un generador de ID aleatorio.
      // En este ejemplo, se utiliza un contador simple.
      return Date.now().toString();
    }
  }
  
  // Crear una instancia de ProductManager
  const productManager = new ProductManager();
  
  // Llamar a getProducts para verificar que inicialmente devuelve un arreglo vacío
  const products = productManager.getProducts();
  console.log("Productos iniciales:", products);
  
  // Agregar un producto
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
  
  // Llamar a getProducts nuevamente para verificar que se haya agregado el producto
  const updatedProducts = productManager.getProducts();
  console.log("Productos actualizados:", updatedProducts);
  
  // Intentar agregar un producto con el mismo código
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
  
  // Obtener un producto por ID
  try {
    const productIdToFind = updatedProducts[0].id; // Tomamos el ID del primer producto en la lista
    const foundProduct = productManager.getProductById(productIdToFind);
    console.log("Producto encontrado por ID:", foundProduct);
  } catch (error) {
    console.error("Error al buscar el producto por ID:", error.message);
  }
  