import fs from 'fs';
import { getNewId } from '../utils.js';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios.');
        }
        const products = await this.getProducts();
        const productExists = products.find((p) => p.code === code)
        if (productExists) {
            console.log('Este producto ya fue agregado.');   
        } else {
            let id = getNewId();
            const newProduct = { id, title, description, price, thumbnail, code, stock };
            products.push(newProduct);
            await this.saveProducts(products);
        }
    }

    async getProducts() {
        try {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const findedProduct = products.find((p) => p.id === id);
        return findedProduct;
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if(index > -1) {
            products.splice(index, 1);
            await this.saveProducts(products);
            console.log('Se ha borrado correctamente el producto');
        } else {
            console.log('No se ha podido borrar el producto.');
        }
    }

    async updateProduct(id, newProduct) {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if(index !== -1){
            products[index] = {
                ...products[index],
                ...newProduct
            };
            await this.saveProducts(products);
            console.log('Producto actualizado: ', products[index]);
            return products[index];
        } else {
            console.log('No se ha podido actualizar el producto. El ID proporcionado no existe.');
            return null;
        }
  
}

        async saveProducts(data) {
            const content = JSON.stringify(data, null, '\t');
            try {
                await fs.promises.writeFile(this.path, content, 'utf-8');
            } catch (error) {
                throw new Error(`El archivo ${this.path} no pudo ser escrito.`)
            }
        }
}


export default ProductManager;