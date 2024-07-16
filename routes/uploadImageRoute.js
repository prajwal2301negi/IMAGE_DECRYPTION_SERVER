import express from 'express';
import {uploadImageController} from '../controllers/uploadImageController.js'
import {uploadUserImage} from '../middlewares/multer.js'
import {authenticateToken} from '../middlewares/authenticateToken.js';


const router = express.Router();


router.post('/uploadImage',authenticateToken,uploadUserImage,uploadImageController);

export default router;

// We have bring image from client to server, now before sending it afterwards, we will encrypt it using pinata