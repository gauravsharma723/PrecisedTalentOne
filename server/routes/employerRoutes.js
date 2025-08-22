import express from 'express';
import { postJob, getMyJobs, deleteJob } from '../controllers/employerController.js';
import upload from '../middleware/upload.js';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';


const router = express.Router();

// All routes are protected and only for "employer"
router.use(verifyToken);
router.use(verifyRole('employer'));

router.post('/jobs', upload.single('company_logo'), postJob);          // POST a new job
router.get('/jobs', getMyJobs);         // GET jobs posted by this employer
router.delete('/jobs/:id', deleteJob);  // DELETE a job




export default router;
