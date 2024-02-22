import express, { Router } from "express";
import {checkEmail, logIn, sendEmail} from "../controller/auth";
import { signUp } from "../controller/user";

const router: Router = express.Router();

router.post('/login', logIn);
router.post('/signup', signUp);
router.post('/mail/send', sendEmail)
router.post('/mail/check', checkEmail)

export default router;