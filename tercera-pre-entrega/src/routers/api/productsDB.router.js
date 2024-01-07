import { Router } from 'express';
import productController from '../../controllers/product.controller.js';
import { CustomError } from '../../utils/CustomError.js';
import { generatorProductError } from '../../utils/CauseMessageError.js';
import EnumsError from '../../utils/EnumsError.js';
import ErrorHandler from '../../middleware/ErrorHandler.js';

const router = Router();

router.get('/products', async (req, res, next) => {
  try {
    const { query = {} } = req;
    const product = await productController.get(query);
    res.status(200).json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
    next(error);
  }
});

router.get('/products/:pid', async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productController.getById({ _id: pid });
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
    next(error);
  }
});

router.post('/products', ErrorHandler, async (req, res, next) => {
    try {
      const { title, description, price, code, status, stock, category } = req.body;
      if (
        !title ||
        !description ||
        !price ||
        !code ||
        !status ||
        !stock ||
        !category
      ) {
        CustomError.createError({
          name: "Error creando el producto",
          cause: generatorProductError({
            title,
            description,
            price,
            code,
            status,
            stock,
            category,
          }),
          message: "Ocurrio un error mientras intentamos crear el producto",
          code: EnumsError.BAD_REQUEST_ERROR,
        });
      }
      const { body } = req;

      const result = await productController.createProduct(body);
      res.status(201).json(result);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
      next(error);
    }
  }
);

router.put('/products/:pid', async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { body } = req;
    const result = await productController.updateById(pid, body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
    next(error);
  }
});

router.delete('/products/:pid', async (req, res, next) => {
  try {
    const { pid } = req.params;
    const result = await productController.deleteById(pid);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
    next(error);
  }
});

export default router;