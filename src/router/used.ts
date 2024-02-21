import express, { Router } from "express";

const router: Router = express.Router();
const used = require('../controller/used');

router.post('/post', used.used_post);
router.patch('/boards', used.used_edit);
router.delete('/boards', used.used_del);
router.get('/boards/:usedId', used.used_details);
router.get('/boards', used.used_list);
router.get('/search', used.used_search);
router.patch('/end', used.used_end);
router.patch('/picks', used.used_picks);

export default router;