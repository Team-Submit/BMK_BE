import express, { Router } from "express";
import members from './members';
import auth from './auth';

const router: Router = express.Router();

router.use('/members', members)
router.use('/auth', auth)

export default router;
