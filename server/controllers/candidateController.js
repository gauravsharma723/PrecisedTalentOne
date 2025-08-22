// controllers/candidateController.js
import pool from '../db.js';

export const getCandidateApplications = async (req, res) => {
    try {
        const userId = req.user.id;

        const [candidateRows] = await pool.query(
            'SELECT id FROM candidates WHERE user_id = ?',
            [userId]
        );
        if (!candidateRows.length) {
            return res.status(404).json({ message: 'Candidate profile not found' });
        }

        const candidateId = candidateRows[0].id;

        const [applications] = await pool.query(
            `SELECT ja.id, ja.status, ja.applied_at, j.title, j.company, j.location, j.salary_range, j.experience_required
       FROM job_applications ja
       JOIN jobs j ON ja.job_id = j.id
       WHERE ja.candidate_id = ?`,
            [candidateId]
        );

        res.json(applications);
    } catch (error) {
        console.error('Error fetching candidate applications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
