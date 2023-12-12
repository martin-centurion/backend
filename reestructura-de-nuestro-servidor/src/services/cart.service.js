import CartDao from "../dao/cart.dao.js";

export default class CartService {
    static findAll(filter = {}) {
        return CartDao.find(filter)
    }

    static async create(payload) {
        console.log('Creando un nuevo carrito.');
        const cart = await CartDao.create(payload);
        console.log('Se ha creado el carrito exitosamente');
        return cart;
    }

    static findById(cartid){
        console.log('CartDao', CartDao);
        return CartDao.getById(cartid);
        
        //return CartDao.getById(cartid).populate('products.product');
    }

    static updateById(cartid, payload) {
        return CartDao.updateById(cartid, payload);
    }

    static deleteById(cartid) {
        return CartDao.deleteById(cartid);
    }

    // CART.SERVICE.JS
    static async addProductToCart(req, res) {
        try {
          const { cid, pid } = req.params;
          await CartDao.addProductToCartById(cid, pid);
          console.log('Producto agregado correctamente');
        } catch (error) {
          console.log(`No se pudo agregar el producto al carrito`);
        }
      }

    /* 

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
    } */
}