import UserModel from '../models/user.model.js'

export default class UserDao {
    get(filter = {}) {
        return UserModel.find(filter);
    }
    getById (uid) {
        return UserModel.findById(uid);
    }
    create (data) {
        return UserModel.create(data);
    }
    updateById (uid, data) {
        return UserModel.updateOne({ _id: uid }, { $set: data });
    }
    deleteById (uid) {
        return UserModel.deleteOne({ _id: uid });
    }
}