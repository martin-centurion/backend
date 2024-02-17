import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Hello People 🖐️' });
});

router.get('/loggers', (req, res) => {
  req.logger.error('Esta es una prueba de log error.');
  req.logger.warn('Esta es una prueba de log warn.');
  res.status(200).send('Ok');
});

export default router;