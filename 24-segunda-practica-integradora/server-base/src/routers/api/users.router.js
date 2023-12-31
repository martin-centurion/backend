import { Router } from "express";
import passport from "passport";
import UserModel from '../../models/user.model.js';
import { authPolicies } from "../../utils.js";

const router = Router();

router.get('/users',
    passport.authenticate('jwt', { session: false }),
    authPolicies(['admin']),
    async (req, res) => {
    res.status(200).json({ user: req.user })
});

router.post('/users', 
    passport.authenticate('jwt', { session: false }),
    authPolicies(['admin']),
    async (req, res) => {
    res.status(200).json({ user: req.user })
    });

router.get('/users/uid', 
    passport.authenticate('jwt', { session: false }),
    authPolicies(['admin']),
    async (req, res) => {
    res.status(200).json({ user: req.user })
    });

router.put('/users/uid',
    passport.authenticate('jwt', { session: false }),
    authPolicies(['admin']),
    async (req, res) => {
    res.status(200).json({ user: req.user })
    });

router.delete('/users/uid', 
    passport.authenticate('jwt', { session: false }),
    authPolicies(['admin']),
    async (req, res) => {
    res.status(200).json({ user: req.user })
    });

export default router;