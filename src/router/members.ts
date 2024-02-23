import express, { Router } from "express";
import { delacc, getAnotherUser, getUser, info } from "../controller/user";
import { validationAccess } from "../middleware/jwt";

const router: Router = express.Router();

router.get('/', validationAccess, getUser)
router.get('/:studentId', validationAccess, getAnotherUser)
router.patch('/', validationAccess, info)
router.delete("/", validationAccess, delacc)

export default router;