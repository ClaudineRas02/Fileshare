import { Router  } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import upload from "../middleware/upload.js";
import { uploadController } from "../controllers/fileController.js";

const router = Router()

router.use(requireAuth)
//endpoint+controller
router.post('/upload',upload.single("file"),uploadController)
export default router