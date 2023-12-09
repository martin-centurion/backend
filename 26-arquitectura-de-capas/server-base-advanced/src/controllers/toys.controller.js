import ToyModel from "../models/toy.model.js";

export default class ToysController {
    static async create(data) {
        console.log('Creando nuevo producto');
        const newToy = await ToyModel.create(data);
        console.log('Producto creado correctamente');
        return newToy;
    }

    static async get(query = {}) {
        const toys = await ToyModel.find(query);
        return toys;
    }

    static async getById(tid) {
        const toy = await ToyModel.findById(tid);
        return toy;
    }

    static async updateById(tid, data) {
        console.log('Actualizando Producto');
        await ToyModel.findById({ id: tid }, { $set: data });
        console.log('Producto actualizado correctamente');
    }


    static async deleteById(tid, data) {
        console.log('Eliminando producto');
        await ToyModel.deleteOne({ id: tid });
        console.log('Producto eliminado correctamente');
    }
}