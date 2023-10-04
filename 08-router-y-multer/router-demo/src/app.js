import express from 'express';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Hello People!</h2>')
});

app.listen(PORT, () => {
    console.log(`Server is runnimg on http://localhost:${PORT}`);
});