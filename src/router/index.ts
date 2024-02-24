import express, { Router } from 'express';
import members from './members';
import auth from './auth';
import used from './used';
import group from './group';

const router = express.Router();

router.use('/members', members)
router.use('/auth', auth)

router.use('/used', used);

router.use('/group', group);

export default router;