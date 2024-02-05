import { Router } from "express";
import BusinessController from "../../controllers/business.controller.js";

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await BusinessController.getAll();
        res.status(200).json({ message: result })
    } catch (error) {
        next(error);
    }
});

router.get('/:bid', async (req, res, next) => {
    try {
        const { params: { bid }} = req;
        const result = await BusinessController.getById(bid);
        res.status(200).json({ message: result })
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const result = await BusinessController.create(body);
        res.status(201).json({ message: result })
    } catch (error) {
        next(error);
    }
});

router.post('/:bid/products', async (req, res, next) => {
    try {
        const { params: { bid }, body } = req;
        await BusinessController.addProduct(bid, body);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.put('/:bid', async (req, res, next) => {
    try {
        const { params: { bid }, body } = req;
        await BusinessController.updateById(bid, body);
        res.status(200).json({ message: 'Todo Oki!' })
    } catch (error) {
        next(error);
    }
});


export default router;