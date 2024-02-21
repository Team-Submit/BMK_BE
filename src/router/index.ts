import express, { Router } from 'express';
import used from './used';

const router: Router = express.Router();

router.use('/used', used);

export default router;