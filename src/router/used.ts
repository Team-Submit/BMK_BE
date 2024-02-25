import express, { Router } from "express";
const { validationAccess } = require('../middleware/jwt');

const router: Router = express.Router();
const used = require('../controller/used');

router.post('/post', validationAccess, used.used_post);
router.patch('/boards/:usedId', validationAccess, used.used_edit);
router.delete('/boards/:usedId', validationAccess, used.used_del);
router.get('/boards/:usedId', validationAccess, used.used_details);
router.get('/boards', validationAccess, used.used_list);
router.get('/search', validationAccess, used.used_search);
router.patch('/end/:usedId', validationAccess, used.used_end);
router.patch('/picks/:usedId', validationAccess, used.used_picks);

export default router;