import express, { Router } from "express";
import {changePassword, checkEmail, logIn, sendEmail} from "../controller/auth";
import { signUp } from "../controller/user";

const router: Router = express.Router();

router.post('/login', logIn);
router.post('/signup', signUp);
router.post('/mail/send', sendEmail)
router.post('/mail/check', checkEmail)
router.patch('/password', changePassword)

export default router;