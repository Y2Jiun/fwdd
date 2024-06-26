// server/routes/user.js
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [existingUser] = await db.query('SELECT * FROM user WHERE User_username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO user (User_username, User_password, User_role) VALUES (?, ?, "user")', [username, hashedPassword]);
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login user/admin
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [user] = await db.query('SELECT * FROM user WHERE User_username = ?', [username]);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user[0].User_password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.json({ role: user[0].User_role, userId: user[0].User_ID });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Fetch all users
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT User_ID, User_username FROM user');
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
