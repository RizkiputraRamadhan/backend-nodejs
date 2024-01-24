import express from "express";
import {
    createAnimal,
    getAnimal,
    getAnimalProses,
    getAnimalApprove,
    getAnimalById,
    updateAnimal,
    handleStatusProses,
    handleStatusPublish,
    handleStatusApprove,
    deleteAnimal
} from "../controllers/AnimalController.js";

const router = express.Router();

router.get('/animal', getAnimal);
router.post('/animal', createAnimal);
router.get('/animal/proses', getAnimalProses);
router.get('/animal/approve', getAnimalApprove);
router.get('/animal/:id', getAnimalById);
router.patch('/animal/:id', updateAnimal);
router.patch('/animal/publish/:id', handleStatusPublish);
router.patch('/animal/proses/:id', handleStatusProses);
router.patch('/animal/approve/:id', handleStatusApprove);
router.delete('/animal/:id', deleteAnimal);

export default router;