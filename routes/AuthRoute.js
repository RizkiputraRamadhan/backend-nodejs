import express from "express";
import {
    loginAdmin
} from "../controllers/AdminController.js";

import { Register, Login } from "../controllers/UserController.js";
const router = express.Router();

router.post('/login', Login);
router.post('/register', Register);

export default router;