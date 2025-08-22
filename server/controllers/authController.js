import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


import sendResetEmail from '../utils/sendEmail.js';


export const registerUser = async (req, res) => {
    const { name, email, password, role = 'candidate' } = req.body;

    try {
        const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Registration error', error: err });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email or username
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, role: user.role },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


export const forgotPasswordHandler = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Incoming email:", email);

        // Query result is typically [rows, fields]
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

        const token = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const expires = new Date(Date.now() + 15 * 60 * 1000);

        await pool.query(
            'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?',
            [hashedToken, expires, email]
        );

        const resetUrl = `http://localhost:5173/reset-password/${token}`;
        console.log("Reset URL:", resetUrl);

        await sendResetEmail(rows[0].email, resetUrl);
        console.log("Email sent via Ethereal");

        res.json({ message: 'Reset link sent to email.' });
    } catch (error) {
        console.error('Forgot Password Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const resetPasswordHandler = async (req, res) => {
    const { token, password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const [user] = await pool.query(
        'SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
        [hashedToken]
    );

    if (!user.length) {
        return res.status(400).json({ message: 'Token is invalid or expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
        [hashedPassword, user[0].id]
    );

    res.json({ message: 'Password updated successfully' });
};

