import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Hello People 🖐️' });
});

router.get('/loggers', (req, res) => {
  req.logger.error('Esta es una prueba de log error.');
  req.logger.warn('Este es una prueba de log warn.');
  req.logger.info('Este es una prueba de log info.');
  req.logger.http('Este es una prueba de log http.');
  req.logger.verbose('Este es una prueba de log verbose.');
  req.logger.debug('Este es una prueba de log debug.')
  req.logger.silly('Este es una prueba de log silly.')
  res.status(200).json('Ok!');
});

export default router;