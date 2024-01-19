import express, { Application, Request, Response } from 'express'

const router = express.Router();
const Used = require('controller/used');

router.post('/used/post', Used.used_post);
router.patch('/used/boards', Used.used_edit);
router.delete('/used/boards', Used.used_del);

module.exports = router;