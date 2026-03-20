import { Router  } from "express";
import { loginController, logoutController,meController } from '../controllers/authController.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

//endpoint+controller
router.post('/login',loginController)
router.post('/logout',requireAuth,logoutController)
router.get('/me',meController)

export default router