export default class CartDTO {
    constructor(cart) {
        this.user = cart.user;
        this.id = cart._id || cart.id;
        this.products = cart.products;
    }
}