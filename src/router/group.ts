import express, { Router } from "express";

const router: Router = express.Router();
const Group = require('controller/group');

router.post('/group/boards', Group.group_post);
router.patch('/group/boards', Group.group_edit);
router.delete('/group/boards', Group.group_del);
router.delete('/group/boards/:groupId', Group.group_details);
router.get('/group/boards', Group.group_list);
router.get('/group/search', Group.group_search);
router.patch('/picks', Group.group_picks);

export default router;