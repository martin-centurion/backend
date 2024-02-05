import BusinessService from '../dao/business.mdb.dao.js';
import { Exception, NotFoundException } from '../utils.js';

export default class BusinessController {
    static getAll(){
       return BusinessService.getAll();
    }

    static create(data){
       return BusinessService.create(data);
    }

    static async addProduct(bid, data){
        const business = await BusinessController.getById(bid);
        business.products.push(data);
        await BusinessController.updateById(bid, {
            products: [ ...business.products, data ]
        });
    }

    static async getById(bid){
        const business = await BusinessService.getById(bid);
        if (!business) {
            throw new NotFoundException('Not found');
        }
        return business;
    }

    static updateById(pid, oid){
        return BusinessService.updateById(bid, data);
    }
}