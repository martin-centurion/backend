import { Router } from "express";
import passport from "passport";
import CourseModel from '../../models/course.model.js';
import { authPolicies } from "../../utils.js";

const router = Router();

router.get('/courses',
    passport.authenticate('jwt', { session: false }),
    authPolicies(['student']),
    async (req, res) => {
        const courses = await CourseModel
            .find()
            .populate('professor')
            .populate('students.student');

            res.status(200).json(courses)
});

router.post('/courses', 
    passport.authenticate('jwt', { session: false }),
    authPolicies(['admin', 'professor']),
    async (req, res) => {
        const body = req.body;
        const course = await CourseModel.create({
            ...body,
            professor: req.user.id,
        });
        res.status(201).json(course);
});

router.get('/courses/cid', 
    passport.authenticate('jwt', { session: false }),
    authPolicies(['student', 'admin', 'professor']),
    async (req, res) => {
        
});

router.put('/courses/cid',
    passport.authenticate('jwt', { session: false }),
    authPolicies(['admin', 'profesor']),
    async (req, res) => {
        res.status(200).json({ user: req.user })
});

router.delete('/courses/uid', 
    passport.authenticate('jwt', { session: false }),
    authPolicies(['admin']),
    async (req, res) => {
        res.status(200).json({ user: req.user })
});

export default router;