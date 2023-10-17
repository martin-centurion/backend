import fs from 'fs';
import { getNewId } from '../utils/utils.js';
import ProductManager from './productManager.js';

const productManager = new ProductManager();

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            return [];
        }
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        const findedCart = carts.find((c) => c.id === id);
        return findedCart;
        
    }

    addProductInCart = async (cartId, prodId) => {
        let cartsById = await this.getCartById(cartId);
        if(!cartsById) return 'Carrito no encontrado';
        let productById = await productManager.getProducts(prodId)
        if(!cartsById) return 'Producto no encontrado';
        
        let cartsAll = await this.getCarts();
        let cartsFilter = cartsAll.filter((cart) => cart.id != cartId);

        if(cartsById.products.some(prod => prod.id === prodId)) {
            let productInCart = cartsById.products.find((prod) => prod.id === prodId)
            productInCart.quantity++;
            let cartsConcat = [{productInCart, ...cartsFilter}];
            await this.saveCarts(cartsConcat);
            return 'Producto sumado al carrito';
        }
        
        let cartsConcat = [{ 
            id: cartId, 
            product: [
                {
                    id: productById.id,
                    quantity: 1}
                ]
            }, ... cartsFilter];
            
        await this.saveCarts(cartsConcat);
        return 'Producto agregado al carrito';
    }

    async addCart() {
        try {
            const cart = await this.getCarts();
            console.log('Carrito', cart.lenght);
            let newCart = {
                id: getNewId(),
                products: []
            }
            cart.push(newCart);
            await this.saveCarts(cart);
            return newCart;
        } catch (error) {
            throw new Error(error)
        }
    }

    async saveCarts(data) {
        const content = JSON.stringify(data, null, `\t`);
        try {
            await fs.promises.writeFile(this.path, content, 'utf-8');
        } catch (error) {
            throw new Error(`El archivo ${this.path} no pudo ser escrito`);
        }
    }
}

export default CartManager;

