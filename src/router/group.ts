import express, { Router } from "express";
const { validationAccess } = require('../middleware/jwt');

const router: Router = express.Router();
const Group = require('controller/group');

router.post('/group/boards', validationAccess, Group.group_post);
router.patch('/group/boards/:groupId', validationAccess, Group.group_edit);
router.delete('/group/boards/:groupId', validationAccess, Group.group_del);
router.get('/group/boards/:groupId', Group.group_details);
router.get('/group/boards', Group.group_list);
router.get('/group/search', Group.group_search);
router.patch('/picks/:groupId:groupId', validationAccess, Group.group_picks);
export default router;