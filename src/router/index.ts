import express, { Router } from 'express';
import group from './group';

const router = express.Router();
const Group = require('controller/group');

router.use('/group', group);

export default router;


