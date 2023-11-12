import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Socket.IO demo'})
});

export default router;