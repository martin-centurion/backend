import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import { uploader } from '../utils.js';

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

router.get('/pets', (req, res) => {
    res.status(200).json(pets)
})

router.post('/pets', uploader.single('thumbnail'), (req, res) => {
    const { body } = req;
    const newPet = {
        id: uuidv4(),
        ... body,
        thumbnail: req.file.path,
    };
    pets.push(newPet)
    res.status(201).json(newPet);
})

export default router;