import { Router } from 'express';
import { StudentDao } from '../../dao/factory.js';
import StudentModel from '../../dao/models/student.model.js';

const router = Router();

router.get('/students', async (req, res, next) => {
  try {
    const students = await StudentDao.get();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

router.get('/students/:uid', async (req, res, next) => {
  try {
    const { params: { uid } } = req;
    const user = await StudentModel.findById(uid);
    if (!user) {
      return res.status(401).json({ message: `User id ${uid} not found 😨.` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/students/', async (req, res, next) => {
  try {
    const { body } = req;
    const user = await StudentModel.create(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/students/:uid', async (req, res, next) => {
  try {
    const { body, params: { uid } } = req;
    await StudentModel.updateOne({ _id: uid }, { $set: body });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/students/:uid', async (req, res, next) => {
  try {
    const { params: { uid } } = req;
    await StudentModel.deleteOne({ _id: uid });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;