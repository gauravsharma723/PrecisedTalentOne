
import pool from '../db.js';

// POST /api/employer/jobs
export const postJob = async (req, res) => {
  const { title, description, location, experience_required, salary_range, job_type, job_level, job_mode } = req.body;

  const company_logo = req.file ? `/uploads/company_logos/${req.file.filename}` : null;
  const posted_by = req.user.id; // From token

  try {
    const [result] = await pool.query(
      `INSERT INTO jobs 
   (title, description, location, experience_required, salary_range, job_type, job_level, job_mode, company_logo, posted_by) 
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        location,
        experience_required,
        salary_range,
        job_type,
        job_level,
        job_mode,
        company_logo,
        posted_by
      ]
    );

    res.status(201).json({ message: 'Job posted successfully' });
  } catch (error) {
    console.error('Post Job Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/employer/jobs
export const getMyJobs = async (req, res) => {
  const posted_by = req.user.id;

  try {
    const [rows] = await pool.query('SELECT * FROM jobs WHERE posted_by = ?', [posted_by]);
    res.json(rows);
  } catch (err) {
    console.error('Get jobs error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// DELETE /api/employer/jobs/:id
export const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const employerId = req.user.id;

  try {
    // Check if the job belongs to this employer
    const [jobs] = await pool.query('SELECT * FROM jobs WHERE id = ? AND posted_by = ?', [jobId, employerId]);

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    await pool.query('DELETE FROM jobs WHERE id = ?', [jobId]);

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Delete Job Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
