import { Router } from "express";
import UsersController from "../../controllers/users.controller.js";

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await UsersController.getAll();
        res.status(200).json({ message: users })
    } catch (error) {
        next(error);
    }
});

router.get('/:oid', async (req, res, next) => {
    try {
        const { params: { oid }} = req;
        const users = await UsersController.getById(oid);
        res.status(200).json({ message: users })
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const user = await UsersController.updateById(body);
        res.status(201).json({ message: user })
    } catch (error) {
        next(error);
    }
});

router.put('/:oid', async (req, res, next) => {
    try {
        const { params: { oid }, body } = req;
        await UsersController.updateById(oid, body);
        res.status(200).json({ message: 'Todo Oki!' })
    } catch (error) {
        next(error);
    }
});


export default router;