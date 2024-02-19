import { Router } from "express";
import UserController from "../../controllers/user.controller.js";
import UserModel from "../../models/user.model.js";
import { authenticationMiddleware, authorizationMiddleware } from "../../utils/utils.js";

const router = Router();

router.get('/users', authenticationMiddleware('jwt'), async (req, res, next) => {
    try {
        const user = await UserController.findAll()
        res.status(200).json(user);   
    } catch (error) {
        next(error)
    }
});

router.get('/users/:uid', authenticationMiddleware('jwt'), async (req, res, next) => {
    const { uid } = req.params;
    try {
        const result = await UserController.findById(uid);
        console.log('result', result);
        res.status(201).json({ uid, result })
    } catch (error) {
        next(error)
    }
});

router.put('/users/:uid', authenticationMiddleware('jwt'), async (req, res, next) => {
    try {
        const { body, params: { uid } } = req;
        await UserController.updateById({ _id: uid }, { $set: body});
        res.status(204).end();
    } catch (error) {
        next(error);
    }
})

router.delete('/users/:uid', authenticationMiddleware('jwt'), async (req, res, next) => {
    try {
        const { params: { uid } } = req;
        await UserController.deleteById({ _id: uid }); 
        res.status(204).end();
    } catch (error) {
        next(error)
    }
})


export default router;