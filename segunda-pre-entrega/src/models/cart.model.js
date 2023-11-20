import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
}, { _id: false })

const cartSchema = new mongoose.Schema({
    products: { type: [productSchema], required: true }
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);