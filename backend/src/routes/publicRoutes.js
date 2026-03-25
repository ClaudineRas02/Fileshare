import { Router  } from "express";
import { accessController } from "../controllers/accessController.js";

const router = Router()

//endpoint+controller
router.get('/f/:token',accessController)
export default router