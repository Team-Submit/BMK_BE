import express, { Router } from "express";
import { getUser } from "../controller/user";
import { validationAccess } from "../middleware/jwt";

const router: Router = express.Router();

router.get('/', validationAccess, getUser)

export default router;