import CartModel from "../models/cart.model.js";
import ProductModel from '../models/product.model.js';

export default class CartDao {
    static async create(data) {
        return CartModel.create(data);
    }

    static get(criteria = {}) {
        return CartModel.find(criteria)
    } 

    static getById(cartid){
        return CartModel.findById(cartid).populate('products.product');
    }

    static updateById(cartid, data) {
        return CartModel.findById({ id: cartid }, { $set: data });
    }

    static deleteById(cartid) {
        return CartModel.deleteOne({ _id: cartid })
    }

    // CART.DAO.JS
    static async addProductToCartById(cartid, pid, data) {
        const cart = await CartModel.findById({ id: cartid }, { $set: data });
        await ProductModel.findById(pid);
        await cart.save();
      }

}