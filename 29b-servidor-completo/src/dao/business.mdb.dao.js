import BusinessModel from '../models/business.model.js';

export default class BusinessDao {
    static getAll() {
        return BusinessModel.find();
    }
    static getById(bid) {
        return BusinessModel.findById(bid);
    }
    static create(data) {
        return BusinessModel.create(data);
    }
    static updateById(bid, data) {
        return BusinessModel.updateOne({ _id: bid}, { $set: data});
    }
    static deleteById(bid) {
        return BusinessModel.deleteOne({ _id: bid });
    }
}