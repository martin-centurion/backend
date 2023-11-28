import { Router } from "express";

const router = Router();

const pets = [
    { name: 'Rex', spice: 'dog' },
    { name: 'Garfield', spice: 'cat' },
    { name: 'Nemo', spice: 'fish' },
  ];

router.param('name', (req, res, next, name) => {
    const pet = pets.find((p) => p.name === name);
    if (!pet) {
        return res.status(404).json({ message: 'Pet not found '});
    }
    req.pet = pet;
    next()
});

router.get('/', (req, res) => {
    res.status(200).json(pets);
});

router.get('/:name([a-zA-Z%20]+)', (req, res) => {
    res.status(200).json(req.pet);
});

router.post('/', (req, res) => {
    const { body } = req;
    const newPet = {
        ...body
    };
    pets.push(newPet);
    res.status(201).json(newPet);
});

router.put('/:name([a-zA-Z%20]+)', (req, res) => {
    req.pet.adopted = true;
    res.status(200).json(req.pet);
});

router.get('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
})

export default router;