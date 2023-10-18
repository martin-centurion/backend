import express from "express";
import ProductsRouter from "./routes/products.router.js";
import CartRouter from "./routes/cart.router.js";
import path from 'path';
import { __dirname } from "./utils/utils.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', ProductsRouter, CartRouter);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

