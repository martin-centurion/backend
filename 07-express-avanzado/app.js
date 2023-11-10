const express = require('express');

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];

app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/api/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find((u) => u.id === parseInt(userId));
    if(!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.'});
    }
    res.status(200).json(user);
})

app.post('/api/users', (req, res) => {
    const body = req.body;
    const { firtsName, lastName, age } = body;
    if(!firtsName || !lastName || !age) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.'})
    };
    const newUser = {
        id: users.length + 1,
        firtsName,
        lastName,
        age
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/api/users/:userId', (req, res) => {
    const body = req.body;
    const { userId } = req.params;
    const { firtsName, lastName, age } = body;
    const user = users.find((u) => u.id === parseInt(userId));
    if(!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.'});
    }
    if (firtsName) {
        user.firtsName = firtsName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    if (age) {
        user.age = age;
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente.'})
});

app.delete('/api/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find((u) => u.id === parseInt(userId));
    if(!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.'});
    };
    users = users.filter((u) => u.id !== parseInt(userId));
    res.status(200).json({ message: 'Usuario eliminado correctamente.'})
})

app.listen(PORT, () => {
    console.log('El servidor esta corriendo en el puerto 8080.');
})