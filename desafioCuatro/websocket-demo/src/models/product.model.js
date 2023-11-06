import mongoose from "mongoose";

const productShema = new mongoose.Schema({
    title:       { type: String, required: true },
    description: { type: String, required: true},
    price:       { type: Number, required: true},
    thumbnail:   { type: String },
    code:        { type: String, required: true},
    stock:       { type: String, required: true}
}, { timestamps: true });

export default mongoose.model('Product', productShema);