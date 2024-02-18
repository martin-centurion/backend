import StudentModel from "./models/student.model.js";

export class StudentDao {
    static get(criteria = {}, opts = {}) {
        return StudentModel.get(criteria);
    }

    static getById(sid, opts = {}) {
        return StudentModel.getById(sid);
    }

    static create(data) {
        return StudentModel.create(data);
    }

    static updateById(sid ,data) {
        const criteria = { _id: sid };
        const operation = { $set: data };
        return StudentModel.updateOne(criteria, operation);
    }

    static delete(sid) {
        const criteria = { _id: sid };
        return StudentModel.deleteOne(criteria);
    }
}