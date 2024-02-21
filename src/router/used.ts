import express, { Router } from "express";

const router: Router = express.Router();
const Used = require('controller/used');

router.post('/post', Used.used_post);
router.patch('/boards', Used.used_edit);
router.delete('/boards', Used.used_del);
router.get('/boards/:usedId', Used.used_details);
router.get('/boards', Used.used_list);
router.get('/search', Used.used_search);
router.patch('/end', Used.used_end);
router.patch('/picks', Used.used_picks);

export default router;