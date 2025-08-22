// routes/candidateRoutes.js
import express from 'express';
import { getCandidateApplications } from '../controllers/candidateController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/candidate/applications
router.get('/applications', verifyToken, getCandidateApplications);

export default router;
