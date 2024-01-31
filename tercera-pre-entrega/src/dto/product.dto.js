export default class ProductDTO {
    constructor(product) {
        this.title = product.title;
        this.id = product._id || product.id;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.thumbnails = product.thumbnails;
        this.code = product.code;
        this.category = product.category
    }
}