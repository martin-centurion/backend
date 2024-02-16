import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Hello from yarn');
});

app.listen(8080, () => {
    console.log('Server running in http://localhost:8080');
    
})