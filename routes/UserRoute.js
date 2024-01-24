import express from "express";
import { getUsers, getUserById, deleteUser, getAnimalChck } from "../controllers/UserController.js";
const router = express.Router();

router.get("/users", getUsers);
router.get("/animal_user", getAnimalChck);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

export default router;
