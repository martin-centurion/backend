import express from "express";
import ProductsRouter from "./routes/products.router.js";
import CartRouter from "./routes/cart.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', ProductsRouter, CartRouter);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

