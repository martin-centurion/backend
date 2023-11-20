import cartModel from "../models/cart.model.js";
import { Exception } from "../utils.js";

export default class CartManager {
    static get(query = {}) {
        const criteria = {};
        return cartModel.find(criteria)
    }

    static async create(data) {
        const cart = await cartModel.create(data);
        console.log('Se ha creado el carrito exitosamente');
        return cart;
    }

    static async getById(cartid){
        const cart = await cartModel.findById(cartid).populate('products.product');
        console.log('Cart', cart);
        if(!cart) {
            throw new Exception('No existe el carrito', 404)
        }
        return cart;
    }

    static async deleteById(cartid) {
        const cart = await cartModel.findById(cartid);
        if(!cart) {
            throw new Exception('No existe el carrito', 404)
        }
        cart.products = [];
        await cartModel.updateOne({ _id: cartid }, cart)
    }

    static async addProductToCart(cartid, pid) {
        const cart = await cartModel.findById(cartid);
        console.log('Cart', cart);
        if(!cart) {
            throw new Exception('No se ha encontrado el carrito', 404)
        }
        const index = cart.products.findIndex((product) => String(product.product) === pid);
        if(index === -1) {
            cart.products.push({ product: pid, quantity: 1})
        } else {
            cart.products[index].quantity++;
        }

        await cartModel.updateOne({ _id: cartid }, cart );
    }

    static async deleteProductFromCart(cartid, pid) {
        const cart = await cartModel.findById(cid);
        console.log('cart', cart);
        if(!cart) {
            throw new Exception('No existe ese carrito', 404);
        }
        const index = cart.products.findIndex((product) => String(product._id) === pid);
        console.log(index);
        if(index === -1) {
            cart.products.splice([index]);
        } else {
            throw new Exception('No existe ese producto dentro del carrito.')
        }
        await cartModel.updateOne({ _id: cartid }, cart );
    };

    static async updateById(cartid, data) {
        const cart = await cartModel.findById(cid);
        if(!cart) {
            throw new Exception('No existe el carrito.', 404);
        }
        const criteria = { _id: cartid };
        const operation = { $set: data };
        await cartModel.updateOne(criteria, operation);
        console.log('Carrito actualizado correctamente.');
    }

    static async updateProductById(cartid, pid, data) {
        const cart = await cartModel.findById(cid);
        const operation = { $set: data };
        if(!cart) {
            throw new Exception('No existe ese carrito', 404)
        };
        const index = cart.products.findIndex((product) => String(product.product) === pid);
        console.log('index', index);
        if(index === -1 || !data.quantity){
            throw new Exception('Solo se puede modificar la cantidad de productos');
        } else {
            cart.products[index].quantity = data.quantity;
        };
        await cartModel.updateOne({ _id: cartid }, cart)
    }
}