import CartModel from "../models/cart.model.js";

export default class CartDao {
    create(data) {
        return CartModel.create(data);
    }

    get(criteria = {}) {
        return CartModel.find(criteria)
    } 

    getById(cartid){
        return CartModel.findById(cartid).populate('user').populate('products.product');
    }

    deleteById(cartid) {
        return CartModel.deleteOne({ _id: cartid })
    }

    updateById(cid, products) {
        CartModel.updateOne({ _id: cid }, { products });
    }

    addProduct(cid, pid, quantity = null) {

    }

    /* static async updateById(cid, products) {
        try {
          const result = await CartModel.updateOne({ _id: cid }, { products });
    
          if (result.matchedCount == 0) {
            throw new Error();
          }
    
          return await CartModel.findOne({ _id: cid });
        } catch (error) {
          throw new Exception(`Cart with id "${cid}" not found`);
        }
      } */
    
    
    /* static async addProduct(cid, pid, quantity = null) {
        const cart = await CartDao.getById(cid);
        const validProduct = ProductDao.productExists(pid);
    
        if (validProduct) {
          const productIndex = cart.products.findIndex(
            (e) => e.product.toString() === pid
          );
    
          if (productIndex != -1) {
            quantity
              ? (cart.products[productIndex].quantity = quantity)
              : cart.products[productIndex].quantity++;
          } else {
            cart.products.push({
              product: pid,
              quantity: quantity ? quantity : 1,
            });
          }
    
          let result = await CartDao.updateById(cid, cart.products);
          return result;
        } else {
          throw new Exception(`Product with id "${pid}" doesn't exist.`, 404);
        }
      } */

}