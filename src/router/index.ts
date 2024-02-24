import express, { Router } from 'express';
import group from './group';

const router = express.Router();

router.use('/group', group);

export default router;