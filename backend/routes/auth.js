import { Router } from 'express';
import upload from '../middleware/upload.js';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = Router();

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);

export default router;
