import OrderService from '../dao/order.mdb.dao.js';
import BusinessServices from '../dao/business.mdb.dao.js';
import UserService from '../dao/user.mdb.dao.js';

import { NotFoundException } from '../utils.js';

export default class OrdersController {
    static getAll(){
       return OrderService.getAll();
    };

    static async create(data){
        const { user: uid, business: bid , products } = data;
        const business = await BusinessServices.getById(bid);
        const user = await UserService.getById(uid);
        const productsResult = business.products.filter(p => products.include(p.id));
        const newOrder = {
            code: Date.now(),
            business: business._id,
            user: user._id,
            products: productsResult,
            total: productsResult.reduce((total, product) => total + product.price ,0),
            status: 'pending',
        };
        return OrderService.create(newOrder);
    };

    static async getById(oid){
        const order = await OrderService.getById(oid);
        if (!order) {
            throw new NotFoundException('Not found');
        }
        return order;
    };

    static async updateById(oid, data){
        return OrderService.getAll(oid, data);
    };

    static async resolve(oid, data){
        const { status } = data;
        return OrderService.getAll(oid, { status });
    };
}