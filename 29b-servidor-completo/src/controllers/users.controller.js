import UserService from '../dao/user.mdb.dao.js';

import { NotFoundException } from '../utils.js';

export default class UsersController {
    static getAll(){
        return UserService.getAll();
    }

    static create(data){
        return UserService.create(data);
    }

    static async getById(uid){
        const user = await UserService.getById(uid);
        if (!user) {
            throw new NotFoundException('Not found');
        }
        return user;
    }

    static async updateById(uid, data){
        return UserService.updateById(uid, data);
    }
}