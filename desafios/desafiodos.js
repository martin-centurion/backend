const { log } = require('console');
const { promises: fs } = require('fs');

// Crear la class Constructor
class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios.');
        }
        const products = await getJSONFromFile(this.path);
        if (products.some((product) => product.code === code)) {
            console.log(`Ya esta en uso el codigo: ${code}`);   
        } else {
            const id = Math.random();
            const newProduct = { id, title, description, price, thumbnail, code, stock };
            products.push(newProduct);
            return saveJSONToFile(this.path, products);
        }
    }

    getProducts() {
        return getJSONFromFile(this.path);
    }

    getProductById () {
        return getJSONFromFile(this.path);
    }

    deleteProductsId = () => deleteToId(this.path);

    async deleteProduct(id) {
        const products = await getJSONFromFile(this.path);
        let index = products.findIndex((product) => product.id === id)
        if (index  > -1 ){
            products.splice(index, 1)
            await saveJSONToFile(this.path, products);
            console.log("Se ha borrado correctamente el producto ")
        } else{
            console.log('No se ha podido borrar el producto');
        }
    }

    async getProdcutById(id) { 
        const products = await getJSONFromFile(this.path);
        let productById = products.some(product => product.id === id)
        if (!productById) {
            console.log("Producto no encontrado")
        } else {
            console.log("Product no encontrado", productById)
        }
    }

    async updateProduct(id, updatedProduct) {
        const getProducts = await getJSONFromFile(this.path);
        const index = getProducts.findIndex(product => product.id === id);
    if (index !== -1) {
      updatedProduct.id = id; 
      products[index] = updatedProduct;
      this.saveProductsToFile(products);
      console.log('Producto Actualizado:', updatedProduct);
      return updatedProduct;
      
    } else {
      console.log('No se ha podido actualizar el producto, ingrese el id correctamente desde el archivo ./products.json');
      return null; 
    }
    }

}

const getJSONFromFile = async (path) => {
    try {
        await fs.access(path);
    } catch (error) {
        return [];
    }
    const content = await fs.readFile(path, 'utf-8');
    try {
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
    }
};

const saveJSONToFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t');
    try {
        await fs.writeFile(path, content, 'utf-8');
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser escrito.`)
    }
};

const deleteToId = async (path)=> {
    try {
        console.log('Intentando borrar el archivo...')
        await fs.unlink('./products.json') 
        console.log('Finalizó el borrado del archivo.')
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser borrado.`);
    }      
}  

const prodManager = async () => {
    try {
        const productManager = new ProductManager("./products.json");
        await productManager.addProduct({
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "sin imagen",
            code: "abc123",
            stock: 25
        });
        const products = await productManager.getProducts();
        console.log('Acá los productos:', products);
        productManager.getProductById(0.06149531499542715) // Ingrese Id de Producto a Buscar
        productManager.deleteProduct(0.06149531499542715) // Ingresar Id de Producto a Eliminar
        await productManager.updateProduct(0.06149531499542715, 'Update', 'Update', 250, 'Update', 'Update', 10)
    } catch (error) {
        console.error(' Ha ocurrido un error: ', error.message);
    }
};

// Funciones 

prodManager()

// deleteToId()
