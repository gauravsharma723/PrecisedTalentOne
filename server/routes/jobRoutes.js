import express from 'express';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';

const router = express.Router();


import {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
} from '../controllers/jobController.js';



// TODO: Add authMiddleware for protected routes if needed



router.get('/', getJobs);
router.get('/:id', getJobById);
// Only authenticated users can create jobs
router.post('/', verifyToken, createJob);
// Only "employer" can update or delete
router.put('/:id', verifyToken, verifyRole('employer'), updateJob);
router.delete('/:id', verifyToken, verifyRole('employer'), deleteJob);

// module.exports = router;
export default router;
