import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

const pets = [
    {
        id: 'e9edb299-ceab-43d2-bc04-9be1d69e901d',
        name: 'Snowball',
        race: 'Maltez',
        age: '3',
        gender: 'M'
    },
];

const middleware = (req, res, next) => {
    const today = new Date();
    const message = `Dia: ${today.toLocaleDateString()} - Hora: ${today.toLocaleTimeString()}`;
    console.log(message);
    next();
};

router.use(middleware); //Middleware a nivel de ruta

router.get('/pets', (req, res) => {
    res.status(200).json(pets);
});

router.post('/pets', (req, res) => {
    const { body } = req;
    const newPet = {
        id: uuidv4(),
        ... body,
    }
    pets.push(newPet);
    res.status(201).json(newPet);
});

export default router;