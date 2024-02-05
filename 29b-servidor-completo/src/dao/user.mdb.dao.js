import UserModel from '../models/user.models.js';

export default class UserDao {
    getAll() {
        return UserModel.find();
    }
    getById(uid) {
        return UserModel.findByid(uid);
    }
    create(data) {
        return UserModel.create(data);
    }
    updateById(uid, data) {
        return UserModel.updateOne({ _id: uid}, { $set: data});
    }
    deleteById(uid) {
        return UserModel.deleteOne({ _id: uid });
    }
}