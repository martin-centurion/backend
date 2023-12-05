import mongoose from "mongoose";
import paginator from 'mongoose-paginate-v2';

const productSubSchema = new mongoose.Schema({
    product:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title:      { type: String },
    thumbnails: { type: String },
    quantity:   { type: Number, required: true }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    title:      { type: String, required: true },
    user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products:   { type: [productSubSchema], default: [] },
}, { timestamps: true });

cartSchema.plugin(paginator);

export default mongoose.model('Cart', cartSchema);