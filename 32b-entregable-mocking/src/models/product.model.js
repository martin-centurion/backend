import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title:          { type: String, required: true },
    description:    { type: String, required: true },
    price:          { type: Number, required: true },
    stock:          { type: Number, required: true },
    thumbnails:     { type: String },
    code:           { type: String },
    category:       { type: String, required: true },
    status:         { type: Boolean, required: true, default: true },
}, { timestamps: true });

productSchema.plugin(mongoosePaginate);
export default mongoose.model('Product', productSchema);