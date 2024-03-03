import express, { Router } from 'express';
import members from './members';
import auth from './auth';
import used from './used';
import group from './group';
import chat from './chat'

const router:Router = express.Router();

router.use('/members', members)
router.use('/auth', auth)
router.use('/used', used);
router.use('/group', group);
router.use('/chatting', chat)

export default router;