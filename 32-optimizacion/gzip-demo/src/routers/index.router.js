import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    try {
        let data = `Hola, CoderHouse`;
        for (let index = 0; index < 10000; index++) {
            data += `Hola, CoderHouse (${index})`;
        }
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
});

export default router;