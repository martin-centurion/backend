import { Router } from 'express';
import ProductManager from '../../dao/ProductManager.js';
import ProductModel from '../../models/product.model.js';
import { 
  authenticationMiddleware,
  authorizationMiddelware
} from "../../utils.js";

const router = Router();

router.get('/products', authenticationMiddleware('jwt'), async (req, res) => {
  const { page = 1, limit = 4, group, sort } = req.query;
  const opts = { page, limit, sort: { price: sort || 'asc' } };
  const criteria = {};
  const { first_name, last_name, role } = req.user;
  if (group) {
    criteria.category = group;
  };
  const product = await ProductModel.paginate(criteria, opts);
  res.render('products', buildResponse({ ...product, group, sort, first_name, last_name, role  }));
});

router.get('/products/:pid', async (req, res) => {
  try {
    const { params: { pid } } = req;
    const product = await ProductManager.getById(pid);
    res.status(200).json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.post('/register-product', authorizationMiddelware('admin'), async (req, res) => {
  const { body } = req;
  await ProductManager.create(body);
  res.render('register-product', { title: 'Registro de productos' })
});

router.put('/products/:pid', async (req, res) => {
  try {
    const { params: { pid }, body } = req;
    await ProductManager.updateById(pid, body);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete('/products/:pid', authorizationMiddelware('admin'), async (req, res) => {
  try {
    const { params: { pid } } = req;
    await ProductManager.deleteById(pid);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
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