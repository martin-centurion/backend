import express from 'express';

import userRouter from './routers/users.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`Server is runnimg on http://localhost:${PORT}`);
});