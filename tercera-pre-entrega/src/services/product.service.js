import ProductDao from "../dao/product.dao";

export default class ProductService {
    static findAll(filter = {}) {
        return ProductDao.get(filter);
      }
    
      static async create(payload) {
        console.log('Creando un nuevo producto.');
        const toy = await ProductDao.create(payload);
        console.log(`Producto creado correctamente (${toy._id}).`);
        return toy;
      }
    
      static findById(uid) {
        return ProductDao.getById(uid);
      }
    
      static updateById(uid, payload) {
        return ProductDao.updateById(uid, payload);
      }
    
      static deleteById(uid) {
        return ProductDao.deleteById(uid);
      }
}