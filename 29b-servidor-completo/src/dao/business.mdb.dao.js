import BusinessModel from '../models/business.model.js';

export default class BusinessDao {
    static getAll() {
        return BusinessModel.find();
    }
    static getById(uid) {
        return BusinessModel.findByid(uid);
    }
    static create(data) {
        return BusinessModel.create(data);
    }
    static updateById(uid, data) {
        return BusinessModel.updateOne({ _id: uid}, { $set: data});
    }
    static deleteById(uid) {
        return BusinessModel.deleteOne({ _id: uid });
    }
}