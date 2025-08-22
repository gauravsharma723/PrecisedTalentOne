// backend/routes/users.js
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: 'Profile data', user: req.user });
});

export default router;
