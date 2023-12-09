import ToyModel from '../models/toy.model.js';

export default class ToyDao {
    static create(data) {
        return ToyModel.create(data)
    }

    static get(criteria = {}) {
        return ToyModel.find(criteria);
    }

    static getById(tid) {
        return ToyModel.findById(tid);
    }

    static async updateById(tid, data) {
        return findById({ id: tid }, { $set: data });
    }

    static async deleteById(tid) {
        return ToyModel.deleteOne({ id: tid });
    }
}