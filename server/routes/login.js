// server/routes/user.js
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();


// Login user/admin
router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const [user] = await db.query('SELECT * FROM user WHERE User_username = ? AND User_email = ?', [username, email]);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid username or email' });
        }

        const isMatch = await bcrypt.compare(password, user[0].User_password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.json({ role: user[0].User_role, userId: user[0].User_ID });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
