import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/origin-demo', (req, res) => {
    res.status(200).json({ message: 'Hola Coder!'});
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})