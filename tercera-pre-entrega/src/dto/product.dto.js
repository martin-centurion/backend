export default class ProductDTO {
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.price = this.product.price;
        this.stock = this.product.stock;
        this.thumbnails = this.product.thumbnails;
        this.code = this.product.code;
        this.category = this.product.category
    }
}