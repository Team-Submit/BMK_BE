import express, { Router } from "express";
import user from './user';
import auth from './auth';

const router: Router = express.Router();

router.use('/members', user)
router.use('/auth', auth)

export default router;
