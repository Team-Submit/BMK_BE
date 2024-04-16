import express, { Router } from "express";
import { used_del, used_details, used_edit, used_end, used_list, used_picks, used_post, used_search } from "../controller/used";
import { validationAccess } from "../middleware/jwt";

const router: Router = express.Router();

router.post('/post', validationAccess, used_post);
router.patch('/boards/:usedId', validationAccess, used_edit);
router.delete('/boards/:usedId', validationAccess, used_del);
router.get('/boards/:usedId', used_details);
router.get('/boards', used_list);
router.get('/search', used_search);
router.patch('/end/:usedId', validationAccess, used_end);
router.patch('/picks/:usedId', validationAccess, used_picks);

export default router;