import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import { registerUser, loginUser, forgotPasswordHandler, resetPasswordHandler } from '../controllers/authController.js';


const router = express.Router();

//
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPasswordHandler);

router.post('/reset-password', resetPasswordHandler);


export default router;
