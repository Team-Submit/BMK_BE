import express, { Router } from "express";
import { group_del, group_details, group_edit, group_list, group_picks, group_post, group_search } from "../controller/group"
import { validationAccess } from "../middleware/jwt";

const router: Router = express.Router();

router.post('/group/boards', validationAccess, group_post);
router.patch('/group/boards/:groupId', validationAccess, group_edit);
router.delete('/group/boards/:groupId', validationAccess, group_del);
router.get('/group/boards/:groupId', validationAccess, group_details);
router.get('/group/boards', validationAccess, group_list);
router.get('/group/search', validationAccess, group_search);
router.patch('/picks/:groupId:groupId', validationAccess, group_picks);

export default router;