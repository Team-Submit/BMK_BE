import express, { Router } from "express";
import user from './user';
import auth from './auth';
import chat from './chat'

const router: Router = express.Router();

router.use('/members', user)
router.use('/auth', auth)
router.use('/chatting', chat)

export default router;
