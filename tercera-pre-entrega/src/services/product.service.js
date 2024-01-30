import { productRepository } from "../repositories/index.js";

export default class ProductService {
    static findAll(filter = {}) {
        return productRepository.get(filter);
      }
    
      static async create(data) {
        console.log('Creando un nuevo producto.');
        const toy = await productRepository.create(data);
        console.log(`Producto creado correctamente (${toy._id}).`);
        return toy;
      }
    
      static findById(pid) {
        return productRepository.getById(pid);
      }
    
      static updateById(pid, data) {
        return productRepository.updateById(pid, data);
      }
    
      static deleteById(pid) {
        return productRepository.deleteById(pid);
      }
}