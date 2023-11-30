import mongoose from "mongoose";
import paginator from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    //products: { type: [productSchema], required: true }
    products: { type: [productSchema], default: [] },
}, { timestamps: true });

productSchema.plugin(paginator);

export default mongoose.model('Cart', cartSchema);