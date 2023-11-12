import { Router } from "express";

const router = Router();

const foods = [
    {
      name: 'Pizza',
      price: 150,
    },
    {
      name: 'Hamburguesa',
      price: 100,
    },
    {
      name: 'Hot Dog',
      price: 50,
    },
    {
      name: 'Tacos',
      price: 70,
    },
    {
      name: 'Torta',
      price: 80,
    },
    {
      name: 'Burrito',
      price: 90,
    },
    {
      name: 'Pasta',
      price: 120,
    },
    {
      name: 'Ensalada',
      price: 70,
    },
    {
      name: 'Sushi',
      price: 200,
    },
    {
      name: 'Alitas',
      price: 100,
    }
  ];

router.get('/', (req, res) => {
    const user = {
        id: "e9edb299-ceab-43d2-bc04-9be1d69e901d",
        firstName: "User",
        lastName: "User",
        age: 3,
        email: "sm@gmail.com",
        role: 'admin'
    };
    res.render('index', { user , foods, isAdmin: user.role === 'admin' })
});

router.get('/register', (req, res) => {
  res.render('register');
})

export default router;