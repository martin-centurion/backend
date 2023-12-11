import { Router } from 'express';
import ProductModel from '../../models/product.model.js';
import { 
  authenticationMiddleware,
  authorizationMiddelware
} from "../../utils.js";

const router = Router();

router.get('/products', authenticationMiddleware('jwt'), async (req, res, next) => {
  try {
      const { page = 1, limit = 4, group, sort } = req.query;
      const opts = { page, limit, sort: { price: sort || 'asc' } };
      const criteria = {};
      const { first_name, last_name, role } = req.user;
      if (group) {
        criteria.category = group;
      };
      const product = await ProductModel.paginate(criteria, opts);
      res.status(200).json(buildResponse({ ...product, group, sort, first_name, last_name, role  }))
  } catch (error) {
      next(error);
  }
});

router.get('/products/:pid', authenticationMiddleware('jwt'), async (req, res, next) => {
  try {
    const { params: { pid } } = req;
    const product = await ProductModel.findById(pid);
    if (!product) {
      return res.status(401).json({ message: `Product id ${uid} not found 😨.` });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error)
    //res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.post('/register-product', authenticationMiddleware('jwt'), authorizationMiddelware('admin'), async (req, res, next) => {
  try {
    const { body } = req;
    const product = await ProductModel.create(body);
    res.status(201).json(product);
  } catch (error) {
    next(error)
  }
});

router.put('/products/:pid', authenticationMiddleware('jwt'), authorizationMiddelware('admin'), async (req, res, next) => {
  try {
    const { body, params: { pid } } = req;
    await ProductModel.updateOne({ _id: pid }, { $set: body });
    res.status(204).end();
  } catch (error) {
    next(error)
  }
});

router.delete('/products/:pid', authenticationMiddleware('jwt'), authorizationMiddelware('admin'), async (req, res, next) => {
  try {
    const { params: { pid } } = req;
    await ProductModel.deleteOne({ _id: pid });
    res.status(204).end();
  } catch (error) {
    next(error)
  }
});

const buildResponse = (data) => {
  return {
    status: 'success',
    payload: data.docs.map(product => product.toJSON()),
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    page: data.page,
    userName: data.first_name,
    userLastName: data.last_name,
    userRole: data.role,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}${data.group ? `&group=${data.group}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
    nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}${data.group ? `&group=${data.group}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
  }
}

export default router;