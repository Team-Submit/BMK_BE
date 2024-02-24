import express, { Router } from "express";
import members from './members';
import auth from './auth';
import used from './used';

const router: Router = express.Router();
router.use('/members', members)
router.use('/auth', auth)
router.use('/used', used);
export default router;
