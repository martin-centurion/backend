import ProductService from "../services/product.service.js";
import { Exception } from "../utils.js";
import { faker } from '@faker-js/faker';

export default class ProductController {

    static async create(data) {
        console.log('Creando el nuevo producto.');
        const newProduct = await ProductService.create(data);
        console.log('Producto creado corretamente.');
        return newProduct;
      }
    
      static async get(query = {}) {
        const product = await ProductService.findAll(query); 
        return product;
      }
    
      static async getById(pid) {
        const product = await ProductService.findById(pid);
        if (!product) {
            throw new Exception('No existe el producto', 404);
        }
        return product;
      }
    
      static async updateById(pid, data) {
        await ProductController.getById(pid);
        if(!product) {
          throw new Exception('No existe el producto.', 404);
        };
        console.log('Actualizando el producto.');
        await ProductService.updateById(pid, data);
        console.log('Actualizado el producto corretamente.');
      }
    
      static async deleteById(pid) {
        await ProductController.getById(pid);
        if(!product) {
          throw new Exception('No existe el producto', 404);
        };
        console.log('Eliminando el producto.');
        await ProductService.deleteById(pid);
        console.log('Producto eliminado corretamente.');
      }

      static async createFakeProducts(){
        const mockProducts = [];
        for (let i = 1; i <= 100; i++) {
          mockProducts.push({
              id: faker.database.mongodbObjectId(),
              title: faker.commerce.productName(),
              description: faker.lorem.paragraph(),
              code: faker.string.alphanumeric({ length: 10 }),
              price: faker.commerce.price(),
              category:faker.commerce.department(),
              stock: faker.number.int({ min: 10000, max: 99999 }),
              thumbnails: faker.image.url(),
          });
        }
        return { docs: mockProducts };
      }
}