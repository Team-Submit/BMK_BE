import express, { Router } from "express";
import { signUp } from "../controller/user";

const router: Router = express.Router();

router.post('/signup', signUp);
router.post('/login', );
router.post('/mail/send', );
router.post('/mail/check', );
router.delete('/logout', );
router.patch('/password',);

export default router;