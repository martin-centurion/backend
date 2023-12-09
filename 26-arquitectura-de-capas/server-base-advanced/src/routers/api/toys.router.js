import { Router } from "express";
import ToysController from "../../controllers/toys.controller.js";

const router = Router();

router.post('/toys', async (req, res, next) => {
    try {
        const newToy = await ToysController.create(req.body);
        res.status(201).json(newToy)
    } catch (error) {
        console.log('Ah ocurrido un error durante la creación del producto.');
        next(error);
    }
});

router.get('/toys', async (req, res, next) => {
    try {
        const product = await ToysController.get(req.query);
        res.status(200).json(product)
    } catch (error) {
        console.log('Ah ocurrido un error durante la busqueda del producto.');
        next(error);
    }
});

router.get('/toys/:tid', async (req, res, next) => {
    try {
        const { params: { tid }} = req;
        const product = await ToysController.getById(tid, req.query);
        res.status(200).json(product)
    } catch (error) {
        console.log('Ah ocurrido un error durante la busqueda del producto.');
        next(error);
    }
});

router.put('/toys/:tid', async (req, res, next) => {
    try {
        const { params: { tid }} = req;
        await ToysController.updateById(tid, req.body);
        res.status(204).end;
    } catch (error) {
        console.log('Ah ocurrido un error durante la actualizacion del producto.');
        next(error);
    }
});

router.delete('/toys/:tid', async (req, res, next) => {
    try {
        const { params: { tid }} = req;
        await ToysController.deleteById(tid);
        res.status(204).end;
    } catch (error) {
        console.log('Ah ocurrido un error durante la eliminacón del producto.');
        next(error);
    }
});

export default router;