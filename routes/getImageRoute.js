import express from 'express'
const router = express.Router();
import {getImageController} from '../controllers/getImageController.js'
import {authenticateToken} from '../middleware/authenticateToken.js'

router.post('/getImage',authenticateToken,getImageController)

export default router;