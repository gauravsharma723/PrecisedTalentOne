import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import employerRoutes from './routes/employerRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import jobRoutes from './routes/jobRoutes.js';



// Load environment variables
dotenv.config();

// Utilities for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON


// Static folder to serve uploads like company logos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/candidate', candidateRoutes);
app.use('/api/jobs', jobRoutes);






// Serve React frontend if you're building for production (optional)
app.use(express.static(path.join(__dirname, 'dist')));

// React Router fallback (optional)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// // ✅ Register Endpoint
// app.post('/api/register', async (req, res) => {
//     const { name, email, password, role } = req.body;

//     // Check if user already exists
//     const [existing] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
//     if (existing.length > 0) {
//         return res.status(400).json({ message: 'Email already registered.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     db.query(
//         'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
//         [name, email, hashedPassword, role || 'candidate'],
//         (err, result) => {
//             if (err) return res.status(500).json({ message: 'Registration failed.', error: err });
//             res.status(201).json({ message: 'User registered successfully.' });
//         }
//     );
// });

// // ✅ Login Endpoint
// app.post('/api/login', (req, res) => {
//     const { email, password } = req.body;

//     db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//         if (err) return res.status(500).json({ message: 'Login error.', error: err });

//         if (results.length === 0) return res.status(404).json({ message: 'User not found.' });

//         const user = results[0];
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

//         const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

//         res.status(200).json({
//             message: 'Login successful',
//             token,
//             user: { id: user.id, name: user.name, role: user.role }
//         });
//     });
// });

