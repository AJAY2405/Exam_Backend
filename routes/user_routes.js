import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { register, login, logout, updateProfile } from '../controllers/user_controller.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

// Auth routes
router.post('/register', singleUpload, register);
router.post('/login', login);
router.get("/logout", logout);

// Profile update
router.post('/profile/update', isAuthenticated, singleUpload, updateProfile);

export default router;
