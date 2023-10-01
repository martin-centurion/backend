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
        const productExists = products.find((product) => product.code === code)
        if (productExists) {
            console.log('Este producto ya fue agregado.');   
        } else {
            let id = parseInt(Math.random() * 1000000);
            const newProduct = { id, title, description, price, thumbnail, code, stock };
            products.push(newProduct);
            await saveJSONToFile(this.path, products);
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

    async updateProduct(id, newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {
        const products = await getJSONFromFile(this.path);
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
          const updatedProduct = {
            ...products[index],
            title: newTitle,
            description: newDescription,
            price: newPrice,
            thumbnail: newThumbnail,
            code: newCode,
            stock: newStock
          };
      
          products[index] = updatedProduct;
          await saveJSONToFile(this.path, products);
          console.log('Producto Actualizado:', updatedProduct);
          return updatedProduct;
        } else {
          console.log('No se ha podido actualizar el producto. El ID proporcionado no existe.');
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
            title: 'Perdiste en Madrid por...',
            description: 'PUTO Y CAGON!!!!!!',
            price: 91218,
            thumbnail: 'Imagen',
            code: 'Code 10',
            stock: 25
        });
        let products = await productManager.getProducts();
        console.log('Acá los productos:', products);
        //productManager.getProductById(0.06149531499542715) // Ingrese Id de Producto a Buscar
        //productManager.deleteProduct(0.06149531499542715) // Ingresar Id de Producto a Eliminar
        //await productManager.updateProduct(0.3981975682506571, 'Update', 'Update', 250, 'Update', 'Update', 10)
    } catch (error) {
        console.error(' Ha ocurrido un error: ', error.message);
    }
};

// Funciones 

prodManager()

// deleteToId()

module.exports = ProductManager;