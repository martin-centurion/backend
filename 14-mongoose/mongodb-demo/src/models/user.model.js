import mongoose from 'mongoose';

const Address = new Schema({
    street:  { type: String },
    city:    { type: String },
    country: { type: String },
})

const user = new mongoose.Schema({
    fullName: { type: String, required: true},
    email:    { type: String, required: true, unique: true},
    age:      { type: Number, required: true},
    status:   { type: String, default: 'active', enum: ['active', 'inactive']},
    address: { type: Address, default: {} },
}, { timestamps: true });

export default mongoose.model('User', user);