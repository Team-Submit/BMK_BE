import express, { Application, Request, Response } from 'express'

const router = express.Router();
const Group = require('controller/group');

router.post('/group/boards', Group.group_post);
router.patch('/group/boards', Group.group_edit);
router.delete('/group/boards', Group.group_del);
router.delete('/group/boards/:groupId', Group.group_details);

module.exports = router;



